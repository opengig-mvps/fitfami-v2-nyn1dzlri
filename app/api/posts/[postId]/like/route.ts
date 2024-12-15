import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const userId = request.headers.get('user-id');
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const postIdInt = parseInt(params.postId, 10);
    if (isNaN(postIdInt)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: parseInt(userId, 10) },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const post = await prisma.post.findFirst({
      where: { id: postIdInt },
    });

    if (!post) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    await prisma.like.create({
      data: {
        postId: postIdInt,
        userId: parseInt(userId, 10),
      },
    });

    const likeCount = await prisma.like.count({
      where: { postId: postIdInt },
    });

    return NextResponse.json({
      success: true,
      message: 'Like added successfully',
      data: { likeCount },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error adding like to post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}