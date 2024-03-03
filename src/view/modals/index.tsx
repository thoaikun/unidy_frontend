'use client'

import { useAppSelector } from "@/lib/hook"
import PostDetail from "./posts/postDetail"

const ModalProvider = () => {
  const postDetail = useAppSelector(state => state.modals.postDetail)

  return (
    postDetail.open && <PostDetail />
  )
}

export default ModalProvider