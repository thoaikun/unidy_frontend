'use client'

import { useAppSelector } from "@/lib/hook"
import PostDetail from "./posts/postDetail"
import DonateModal from "./campaigns/donate"

const ModalProvider = () => {
  const { postDetail, donateModal } = useAppSelector(state => state.modals)

  return (
    <>
      {postDetail.open && <PostDetail />}
      {donateModal.open && <DonateModal />}
    </>
  )
}

export default ModalProvider