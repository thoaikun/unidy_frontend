'use client'

import { useAppSelector } from "@/lib/hook"
import PostDetail from "./posts/postDetail"
import DonateModal from "./campaigns/donate"
import CustomBackdrop from "./backdrop"

const ModalProvider = () => {
  const backdrop = useAppSelector((state) => state.backdrop)
  const postDetailModal = useAppSelector((state) => state.postDetailModal)
  const donateModal = useAppSelector((state) => state.donateModal)

  return (
    <>
      {backdrop.open && <CustomBackdrop />}
      {postDetailModal.open && <PostDetail />}
      {donateModal.open && <DonateModal />}
    </>
  )
}

export default ModalProvider