import firestore from "@/lib/firebase/firebase-firestore-database";
import { Post } from "@/lib/models/post/post";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

const createPost = async (post: Post) => {
  try {
    const postDocRef = doc(collection(firestore, "posts"));

    await setDoc(postDocRef, {
      authorId: post.authorId,
      content: post.content,
      imageUrls: post.imageUrls,
      peopleWhoLiked: post.peopleWhoLiked,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return postDocRef.id;
  } catch (error) {
    throw `Có lỗi xảy ra khi đăng bài viết, vui lòng thử lại: ${error}`;
  }
};

const deletePost = async (postId: string) => {
  try {
    const postDocRef = doc(firestore, "posts", postId);
    await deleteDoc(postDocRef);
  } catch (error) {
    throw `Có lỗi xảy ra khi xóa bài viết, vui lòng thử lại: ${error}`;
  }
};

const getPostsByAuthorId = async (authorId: string): Promise<Post[] | []> => {
  const postsRef = collection(firestore, "posts");
  const q = query(postsRef, where("authorId", "==", authorId));

  const querySnapshot = await getDocs(q);

  const posts: Post[] = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post)
  );

  return posts;
};

export { createPost, getPostsByAuthorId };
