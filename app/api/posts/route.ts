import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the GET method handler for fetching posts with pagination
export async function GET(request: Request) {
  try {
    // Extract query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Calculate the offset for pagination
    const skip = (page - 1) * pageSize;

    // Fetch posts from the database with pagination
    const posts = await prisma.post.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        comments: true,
        likes: true,
      },
    });

    // Fetch the total count of posts for pagination
    const totalPosts = await prisma.post.count();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalPosts / pageSize);

    // Send a success response with the posts data and pagination info
    return NextResponse.json({
      success: true,
      message: 'Posts fetched successfully',
      data: {
        posts,
        pagination: {
          page,
          pageSize,
          totalPages,
          totalPosts,
        },
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}

type PostRequestBody = {
  imageUrl: string;
  description: string;
  recipeDetails: string;
  userId: number;
};

export async function POST(request: Request) {
  try {
    const body: PostRequestBody = await request.json();

    const { imageUrl, description, recipeDetails, userId } = body;

    if (!imageUrl || !description || !recipeDetails || isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Missing required fields or incorrect format' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        imageUrl,
        description,
        recipeDetails,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      data: { postId: post.id.toString() },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}