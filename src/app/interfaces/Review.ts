


export interface Review {
  reviewId: number
  eventId: number
  userId: number
  rating: number
  comment: string
  addReview: () => void
  vieReviews: () => Review[]
}