import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/modules/comments";

import CommentCard from "./CommentCard";

export default function CommentList() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getComments())    
  }, []);
  const data = useSelector((state) => state.comments);

    const CommentListData = data
  console.log(CommentListData);

//   let DataSet = {
//     profile_image: "imageUrl",
//     nickname: "고양잉",
//     content: "내집은 어디있낭",
//     createdAt: "31분 전",
//     isEditable: true,
//   };

  return (
    <>
      {/* {data.map((item) => (
        <CommentCard
          key={item.id}
          id={item.id}
        //   profile_image={item.profile_image}
          nickname={item.nickname}
          content={item.content}
        //   createdAt={item.createdAt}
        //   isEditable={item.isEditable}
        />
      ))} */}
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </>
  );
}