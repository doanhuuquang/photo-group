import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import auth from "@/lib/firebase/firebase-auth";
import firestore from "@/lib/firebase/firebase-firestore-database";
import User from "@/lib/models/user/user";

const createUser = async ({
  email,
  password,
  user,
}: {
  email: string;
  password: string;
  user: User;
}) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(firestore, "users", credential.user.uid), {
    avatarBase64: user.avatarBase64,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthOfDate: user.birthOfDate,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isVerified: user.isVerified,
  });
};

const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(firestore, "users", userId);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();

  return new User({
    id: docSnap.id,
    avatarBase64: data.avatarBase64,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    birthOfDate: data.birthOfDate,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    isVerified: data.isVerified,
  });
};

export { createUser, getUserById };
