import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import RTE from './RTE'
import { useSelector } from 'react-redux'
import Select from './Select'

function PostForm({ post = null }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      status: post?.status || "active",
    }
  })

  const user = useSelector((state) => state.auth.userData)
  const userS= useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const submit = async (data) => {
    try {
      console.log("user ",user);
      console.log("status:",userS);
      

      const isEdit = !!post?.$id
      

      let file
      if (data.image && data.image[0]) {
        file = await service.uploadFile(data.image[0])
      }

      if (isEdit) {
        if (file && post?.featuredImage) {
          await service.deleteFile(post.featuredImage)
        }

        const update = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
          userId: post?.userId || user?.$id,
        })

        if (update) {
          navigate(`/post/${update.$id}`)
        }
      } else {
        const dbPost = await service.createPost({
          ...data,
          featuredImage: file ? file.$id : null,
          userId: user?.$id,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }

    } catch (error) {
      console.log("error while updating", error)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-")
    }
    return ""
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post?.title || "Featured preview"}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
