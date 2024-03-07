import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Input,
  Textarea,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
} from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostValidation } from "@/lib/validation";
import FileUploader from "../shared/FileUploader";
import { Models } from "appwrite";
import { useCreatePost, useGetCourses, useUpdatePost } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { Loader } from "../shared";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { ICourses } from "@/types";

type PostFormProps = {
  post?: Models.Document;
  action : "Create" | "Update";
};


const PostForm = ({post, action}:PostFormProps) => {
 
  const {mutateAsync : createPost, isPending: isLoadingCreate} = useCreatePost();
  const {mutateAsync : updatePost, isPending: isLoadingUpdate} = useUpdatePost();

  const { data: listcourse, isPending,error } = useGetCourses();
 // const [course, setCourse] = useState<ICourses[]>();
  //setCourses(listcourse)
  //setCourses(listcourse);
  //console.log(listcourse) // Get courses list
  const { user } = useUserContext();
  const {toast} = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //    if (isPending) return;
  //    setCourse([...listcourse]);
  // },[isPending]);

  // console.log(course);
     // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location : post ? post?.location : "", 
      tags : post ? post.tags.join(',') : "",
      curso: post ? post?.curso : "", 
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(value: z.infer<typeof PostValidation>) {

     // ACTION = UPDATE
     if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/posts/${post.$id}`);
    }


   // ACTION = CREATE
    const newPost = await createPost({
      ...value,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
    }
    navigate("/");
  };


  
  if (isPending) return <Loader />;

  if (error) return 'An error has occurred: ' + error.message
  return (
    
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
    <FormField
          control={form.control}
          name="curso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grado/Curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listcourse.map((cur:ICourses) => {
                    return (
                      <SelectItem key={cur.value} value={cur.label}>
                        {cur.label}
                      </SelectItem>
                      
                    );
                  })}
                 
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

 
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separate by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Expression,Art,Learn"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

       
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm