'use client'

import { useAppSelector } from "@/lib/hook"
import PostDetail from "./posts/post-detail"
import DonateModal from "./campaigns/donate"
import CustomBackdrop from "./backdrop"
import NewPost from "./posts/new-post"
import CampaignDetail from "./campaigns/campaign-detail"
import JoinCampaignModal from "./campaigns/join-campaign"

const ModalProvider = () => {
  const backdrop = useAppSelector((state) => state.backdrop)
  const newPostModal = useAppSelector((state) => state.newPostModal)
  const postDetailModal = useAppSelector((state) => state.postDetailModal)
  const campaignDetailModal = useAppSelector((state) => state.campaignDetailModal)
  const donateModal = useAppSelector((state) => state.donateModal)
  const joinCampaignModal = useAppSelector((state) => state.joinCampaignModal)

  return (
    <>
      {backdrop.open && <CustomBackdrop />}
      {newPostModal.open && <NewPost />}
      {postDetailModal.open && <PostDetail />}
      {campaignDetailModal.open && <CampaignDetail />}
      {donateModal.open && <DonateModal />}
      {joinCampaignModal.open && <JoinCampaignModal />}
    </>
  )
}

export default ModalProvider