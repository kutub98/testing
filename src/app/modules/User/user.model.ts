import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
  role: 'student' | 'admin';
  isSuperAdmin: boolean;

  // Basic info
  fullNameBangla: string;
  fullNameEnglish: string;
  fatherName?: string;
  motherName?: string;
  dateOfBirth?: Date;
  age: number;
  gender?: 'male' | 'female' | 'other';

  // Address
  union?: string;
  postOffice?: string;
  upazila?: string;
  district?: string;
  address: string;

  // Education
  grade: string;
  institutionName?: string;
  institutionAddress?: string;
  rollId?: string;

  // Contact
  contact: string;
  contactType: 'phone' | 'email';
  parentContact?: string;
  whatsappNumber?: string;

  // Health
  bloodGroup?: string;
  specialNeeds?: string;

  // Digital ability
  hasSmartphone?: boolean;
  internetUsage?: 'always' | 'sometimes' | 'never';

  // Interests & goals
  interests: string[];
  preferredSubjects?: string[];
  futureGoals?: string;

  // Profile image
  profileImage?: string;

  // Auth
  password: string;
  tokens: string[];
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },

    // Basic info
    fullNameBangla: { type: String, required: true },
    fullNameEnglish: { type: String, required: true },
    fatherName: { type: String },
    motherName: { type: String },
    dateOfBirth: { type: Date },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'] },

    // Address
    union: { type: String },
    postOffice: { type: String },
    upazila: { type: String },
    district: { type: String },
    address: { type: String, required: true },

    // Education
    grade: { type: String, required: true },
    institutionName: { type: String },
    institutionAddress: { type: String },
    rollId: { type: String },

    // Contact
    contact: { type: String, required: true, unique: true },
    contactType: { type: String, enum: ['phone', 'email'], required: true },
    parentContact: { type: String },
    whatsappNumber: { type: String },

    // Health
    bloodGroup: { type: String },
    specialNeeds: { type: String },

    // Digital ability
    hasSmartphone: { type: Boolean, default: false },
    internetUsage: {
      type: String,
      enum: ['always', 'sometimes', 'never'],
      default: 'never',
    },

    // Interests & goals
    interests: [{ type: String }],
    preferredSubjects: [{ type: String }],
    futureGoals: { type: String },

    // Profile image (নতুন যোগ করা)
    profileImage: { type: String },

    // Auth
    password: { type: String, required: true },
    tokens: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export const User = mongoose.model<IUser>('User', UserSchema);
