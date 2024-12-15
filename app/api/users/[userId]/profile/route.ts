import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type UserProfileRequestBody = {
  email: string;
  username: string;
  name?: string;
  bio?: string;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: UserProfileRequestBody = await request.json();
    const { email, username, name, bio } = body;

    if (!email || !username) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const updatedUser = await prisma.user.updateMany({
      where: { id: userId },
      data: {
        email: String(email),
        username: String(username),
        name: name ? String(name) : undefined,
        bio: bio ? String(bio) : undefined,
      },
    });

    if (updatedUser.count === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const userProfile = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: userProfile,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}