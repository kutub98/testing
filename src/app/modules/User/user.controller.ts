import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from './user.model';
import config from '../../config';
import mongoose from 'mongoose';
import { AuthRequest } from '../../middleware/auth.middleware';
import path from 'path';
import fs from 'fs';
// Generate JWT Token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwt_secret as string, { expiresIn: '7d' });
};
export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      fullNameBangla,
      fullNameEnglish,
      fatherName,
      motherName,
      dateOfBirth,
      age,
      gender,
      union,
      postOffice,
      upazila,
      district,
      address,
      grade,
      institutionName,
      institutionAddress,
      rollId,
      contact,
      contactType,
      parentContact,
      whatsappNumber,
      bloodGroup,
      specialNeeds,
      hasSmartphone,
      internetUsage,
      interests,
      preferredSubjects,
      futureGoals,
      password,
    } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ contact });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          'এই পরিচিতি নম্বর/ইমেইল দিয়ে ইতিমধ্যেই একজন ব্যবহারকারী নিবন্ধিত',
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    let profileImagePath: string | undefined;
    if (req.file) {
      profileImagePath = `/uploads/profile-pics/${req.file.filename}`;
    }
    // Create new user
    const newUser = new User({
      fullNameBangla,
      fullNameEnglish,
      fatherName,
      motherName,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      age: parseInt(age),
      gender,
      union,
      postOffice,
      upazila,
      district,
      address,
      grade,
      institutionName,
      institutionAddress,
      rollId,
      contact,
      contactType,
      parentContact,
      whatsappNumber,
      bloodGroup,
      specialNeeds,
      hasSmartphone: hasSmartphone === 'true',
      internetUsage,
      interests: Array.isArray(interests)
        ? interests
        : interests
          ? [interests]
          : [],
      preferredSubjects: Array.isArray(preferredSubjects)
        ? preferredSubjects
        : preferredSubjects
          ? [preferredSubjects]
          : [],
      futureGoals,
      password: hashedPassword,
      profileImage: profileImagePath,
      role: 'student',
    }) as IUser & { _id: mongoose.Types.ObjectId; tokens: string[] };
    await newUser.save();
    // Generate token
    const token = generateToken(newUser._id.toString());
    // Store token in user document
    newUser.tokens.push(token);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: 'ব্যবহারকারী সফলভাবে নিবন্ধিত হয়েছে',
      data: {
        user: {
          id: newUser._id,
          fullNameBangla: newUser.fullNameBangla,
          fullNameEnglish: newUser.fullNameEnglish,
          contact: newUser.contact,
          contactType: newUser.contactType,
          role: newUser.role,
          profileImage: newUser.profileImage,
        },
        token,
      },
    });
  } catch (error) {
    console.error('নিবন্ধন ত্রুটি:', error);
    res.status(500).json({ success: false, message: 'সার্ভার ত্রুটি' });
  }
};
// Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { contact, password } = req.body;
    // Find user by contact
    const user = await User.findOne({ contact, isActive: true });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }
    // Generate token
    const token = generateToken(
      (user._id as mongoose.Types.ObjectId).toString(),
    );
    // Store token in user document
    user.tokens.push(token);
    await user.save();
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          fullNameBangla: user.fullNameBangla,
          fullNameEnglish: user.fullNameEnglish,
          contact: user.contact,
          contactType: user.contactType,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const checkUserExists = async (req: Request, res: Response) => {
  try {
    const { contact, contactType } = req.body;
    const user = await User.findOne({ contact, contactType });

    res.status(200).json({
      success: true,
      exists: !!user,
      message: user ? 'User exists' : 'User not found',
    });
  } catch (error) {
    console.error('Check user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
// Logout User
export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token required',
      });
    }
    const token = authHeader.substring(7);
    // Remove token from user document
    await User.findByIdAndUpdate(req.user?.userId, {
      $pull: { tokens: token },
    });
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
    });
  }
};
// Get User Profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select(
      '-password -tokens',
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'ব্যবহারকারী পাওয়া যায়নি' });
    }
    // পূর্ণ URL সহ ইমেজ পাথ রিটার্ন করুন
    const userData = user.toObject();
    if (userData.profileImage) {
      userData.profileImage = `${req.protocol}://${req.get('host')}${userData.profileImage}`;
    }
    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error('প্রোফাইল পাওয়ার ত্রুটি:', error);
    res.status(500).json({ success: false, message: 'সার্ভার ত্রুটি' });
  }
};
// Update User Profile
// Get All Users for Admin
export const getAllUsersForAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({ role: 'student' })
      .select('-password -tokens')
      .sort({ createdAt: -1 });

    // Add full URL for profile images
    const usersWithImages = users.map((user) => {
      const userData = user.toObject();
      if (userData.profileImage) {
        userData.profileImage = `${req.protocol}://${req.get('host')}${userData.profileImage}`;
      }
      return userData;
    });

    res.status(200).json({
      success: true,
      data: usersWithImages,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get User Details with Participations
export const getUserDetailsWithParticipations = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    // Get user details
    const user = await User.findById(userId).select('-password -tokens');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Get user's participations with populated data
    const participations = await mongoose.connection
      .collection('participations')
      .aggregate([
        { $match: { studentId: new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'quizzes',
            localField: 'quizId',
            foreignField: '_id',
            as: 'quiz',
          },
        },
        {
          $lookup: {
            from: 'events',
            localField: 'quiz.eventId',
            foreignField: '_id',
            as: 'event',
          },
        },
        { $unwind: { path: '$quiz', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$event', preserveNullAndEmptyArrays: true } },
      ])
      .toArray();

    // Add full URL for profile image
    const userData = user.toObject();
    if (userData.profileImage) {
      userData.profileImage = `${req.protocol}://${req.get('host')}${userData.profileImage}`;
    }

    res.status(200).json({
      success: true,
      data: {
        user: userData,
        participations: participations,
      },
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    let updateData: any = { ...req.body };
    // Explicitly handle dateOfBirth (fix for CastError)
    if (updateData.dateOfBirth) {
      const dateStr = updateData.dateOfBirth;
      if (dateStr && !isNaN(Date.parse(dateStr))) {
        updateData.dateOfBirth = new Date(dateStr);
      } else {
        // If invalid date, remove it (since optional)
        delete updateData.dateOfBirth;
      }
    }
    // Handle age as number
    if (updateData.age) {
      updateData.age = parseInt(updateData.age);
      if (isNaN(updateData.age)) {
        return res.status(400).json({ success: false, message: 'অবৈধ বয়স' });
      }
    }
    // Handle boolean fields
    if (updateData.hasSmartphone !== undefined) {
      updateData.hasSmartphone =
        updateData.hasSmartphone === 'true' ||
        updateData.hasSmartphone === true;
    }
    // Ensure arrays are arrays (multer should handle multiple appends)
    if (updateData.interests && !Array.isArray(updateData.interests)) {
      updateData.interests = [updateData.interests];
    }
    if (
      updateData.preferredSubjects &&
      !Array.isArray(updateData.preferredSubjects)
    ) {
      updateData.preferredSubjects = [updateData.preferredSubjects];
    }
    // Remove sensitive/locked fields (prevent overwriting)
    delete updateData.password;
    delete updateData.tokens;
    delete updateData.contact;
    delete updateData.contactType;
    delete updateData.role;
    delete updateData.isSuperAdmin;
    delete updateData.isActive;
    // Handle profile image if uploaded
    if (req.file) {
      updateData.profileImage = `/uploads/profile-pics/${req.file.filename}`;

      // Delete old image if exists
      const existingUser = await User.findById(req.user?.userId).select(
        'profileImage',
      );
      if (existingUser && existingUser.profileImage) {
        const oldImagePath = path.join(
          process.cwd(),
          'public',
          existingUser.profileImage.replace('/uploads', ''),
        ); // Adjust path if needed
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select('-password -tokens');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'ব্যবহারকারী পাওয়া যায়নি' });
    }
    // Return full URL for image
    const userData = user.toObject();
    if (userData.profileImage) {
      userData.profileImage = `${req.protocol}://${req.get('host')}${userData.profileImage}`;
    }
    res.status(200).json({
      success: true,
      message: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে',
      data: userData,
    });
  } catch (error: any) {
    console.error('প্রোফাইল আপডেট ত্রুটি:', error);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'সার্ভার ত্রুটি'
        : error.message || 'সার্ভার ত্রুটি';
    res.status(500).json({ success: false, message });
  }
};
