"use client";
import { db } from "@/neon";
import { interview } from "@/neon/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import styles from "../../Dashboard.module.css";
import Button from "../_components/Button";

const Page = ({ params }) => {
  const [interviewDetails, setInterviewDetails] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    console.log(params);
    YourInterviewContent();
  }, [params.interviewId]);

  const YourInterviewContent = async () => {
    const response = await db
      .select()
      .from(interview)
      .where(eq(interview.interviewId, params.interviewId));
    setInterviewDetails(response[0]);
    // console.log(response)
  };

  return (
    <div className={styles.background}>
      <h2>Let's get started</h2>
      <div>
        <main className="flex justify-center items-center px-8 py-20 max-md:px-5">
          <div className="px-14 w-full max-w-screen-xl max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                {webcamEnabled ? (
                  <Webcam
                    onUserMedia={() => setWebcamEnabled(true)}
                    onUserMediaError={() => setWebcamEnabled(false)}
                    style={{
                      width: 300,
                      height: 300,
                    }}
                  />
                ) : (
                    <Image
                      src="/droplet-hero.png"
                    alt="Interview preparation visual"
                    className="w-full aspect-square max-md:mt-10 max-md:max-w-full"
                  />
                )}
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow py-11 text-base font-bold text-white max-md:mt-10 max-md:max-w-full">
                  <h1 className="text-4xl font-semibold  max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                    Activate your webcam and microphone to begin the interview.
                  </h1>
                  <p className="mt-6 font-light leading-6 max-md:max-w-full">
                    Your AI-generated interview includes 5 questions. Ensure you
                    record your answers to receive AI-generated feedback.
                  </p>
                  <button
                    text="ENABLE"
                    onClick={() => {
                     
                      setWebcamEnabled(true)
                    }}
                    className="self-start px-5 py-4 mt-6 whitespace-nowrap border border-solid bg-zinc-800 border-gray-950 rounded-[50px] tracking-[2px]"
                  >Enable</button>
                  <Button
                    text="DIVE INTO THE INTERVIEW FRENZY!"
                    className="px-6 py-4 mt-6 bg-indigo-600 border border-violet-600 border-solid rounded-[50px] tracking-[2px] max-md:px-5 max-md:max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
