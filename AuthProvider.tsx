"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";
import { ReactElement } from "react";

export const AuthProvider = ({children}: {children: ReactElement}) => {
  return <KindeProvider>{children}</KindeProvider>;
};