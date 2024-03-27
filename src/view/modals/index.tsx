'use client'

import { useAppSelector } from "@/lib/hook"
import PostDetail from "./posts/postDetail"
import DonateModal from "./campaigns/donate"
import CustomBackdrop from "./backdrop"

const ModalProvider = () => {
  const { backdrop, postDetailModal, donateModal } = useAppSelector((state) => state)

  return (
    <>
      {backdrop.open && <CustomBackdrop />}
      {postDetailModal.open && <PostDetail />}
      {donateModal.open && <DonateModal />}
    </>
  )
}

export default ModalProvider