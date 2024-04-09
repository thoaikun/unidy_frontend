'use client'

import { useAppSelector } from "@/lib/hook"
import PostDetail from "./posts/post-detail"
import DonateModal from "./campaigns/donate"
import CustomBackdrop from "./backdrop"
import NewPost from "./posts/new-post"
import CampaignDetail from "./campaigns/campaign-detail"

const ModalProvider = () => {
  const backdrop = useAppSelector((state) => state.backdrop)
  const newPostModal = useAppSelector((state) => state.newPostModal)
  const postDetailModal = useAppSelector((state) => state.postDetailModal)
  const campaignDetailModal = useAppSelector((state) => state.campaignDetailModal)
  const donateModal = useAppSelector((state) => state.donateModal)

  return (
    <>
      {backdrop.open && <CustomBackdrop />}
      {newPostModal.open && <NewPost />}
      {postDetailModal.open && <PostDetail />}
      {campaignDetailModal.open && <CampaignDetail />}
      {donateModal.open && <DonateModal />}
    </>
  )
}

export default ModalProvider