import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = parseInt(params.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    const body = await request.json();
    const { imageUrl, description, recipeDetails } = body;

    if (!imageUrl || !description || !recipeDetails) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        imageUrl: String(imageUrl),
        description: String(description),
        recipeDetails: String(recipeDetails),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}