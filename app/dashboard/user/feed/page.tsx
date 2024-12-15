"use client";

import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Heart, MessageSquare, Share, LoaderCircleIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const FeedPage: React.FC = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${session?.user?.id}/posts?page=${page}`);
      setPosts(res?.data?.data?.posts);
      setTotalPages(res?.data?.data?.totalPages);
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleLike = async (postId: string) => {
    if (!session) {
      toast.error("You need to be logged in to like posts");
      return;
    }

    try {
      const res = await axios.post(`/api/posts/${postId}/like`);
      if (res?.data?.success) {
        const updatedPosts = posts?.map((post) =>
          post?.id === postId ? { ...post, likes: res?.data?.data?.likes } : post
        );
        setPosts(updatedPosts);
        toast.success("Post liked!");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    }
  };

  const handleComment = async (postId: string, comment: string) => {
    if (!session) {
      toast.error("You need to be logged in to comment on posts");
      return;
    }

    try {
      const res = await axios.post(`/api/posts/${postId}/comment`, { comment });
      if (res?.data?.success) {
        const updatedPosts = posts?.map((post) =>
          post?.id === postId ? { ...post, comments: res?.data?.data?.comments } : post
        );
        setPosts(updatedPosts);
        toast.success("Comment added!");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container px-4 md:px-6 py-6">
          <ScrollArea className="w-full whitespace-nowra">
            <div className="flex w-max space-x-4 mt-10">
              {loading ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : posts?.length === 0 ? (
                <p>No posts available</p>
              ) : (
                posts?.map((post, i) => (
                  <Card key={post?.id} className="w-full mb-6">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage src={post?.user?.avatar} alt={post?.user?.name} />
                        <AvatarFallback>{post?.user?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{post?.user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Posted {new Date(post?.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <img
                        src={post?.image}
                        alt={`Post ${i + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4 w-full">
                        <Button variant="ghost" size="icon" onClick={() => handleLike(post?.id)}>
                          <Heart className="h-5 w-5" />
                          <span className="sr-only">Like</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-5 w-5" />
                          <span className="sr-only">Comment</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share className="h-5 w-5" />
                          <span className="sr-only">Share</span>
                        </Button>
                      </div>
                      <div className="text-sm">
                        <p>
                          <span className="font-medium">{post?.user?.name}</span> {post?.caption}
                        </p>
                        <p className="text-muted-foreground mt-1">
                          View all {post?.comments?.length} comments
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </section>
        <section className="container px-4 md:px-6 py-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => setPage(page - 1)} disabled={page === 1} />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={() => setPage(page + 1)} disabled={page === totalPages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </main>
    </div>
  );
};

export default FeedPage;