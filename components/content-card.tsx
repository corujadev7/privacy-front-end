import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Lock } from 'lucide-react'

interface ContentCardProps {
  avatarSrc: string
  name: string
  username: string
  mediaSrc: string // Changed from imageSrc to mediaSrc
  mediaType: 'image' | 'video' // New prop to specify media type
  likes: number
  comments: number
}

export function ContentCard({ avatarSrc, name, username, mediaSrc, mediaType, likes, comments }: ContentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {/* Card Header */}
      <div className="flex items-center p-3 border-b border-gray-100">
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-grow">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500">@{username}</p>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>

     {/* Content Media with Lock Overlay */}
      <div className="relative w-full aspect-square bg-gray-200 flex items-center justify-center">
        {mediaType === 'image' ? (
          <Image
            src={mediaSrc || "/placeholder.svg"} // Use the provided mediaSrc directly
            alt="Content image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        ) : (
          <video
            src={mediaSrc} // Use the provided mediaSrc directly
            autoPlay // Autoplay the video
            loop // Loop the video
            muted // Mute the video for autoplay compatibility
            playsInline // Enable inline playback on iOS
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white">
          <Lock className="w-8 h-8 mb-2" />
          <div className="flex gap-4 text-sm font-semibold">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-around p-3 text-gray-500 border-t border-gray-100">
        <Heart className="w-5 h-5 cursor-pointer hover:text-red-500" />
        <MessageCircle className="w-5 h-5 cursor-pointer hover:text-blue-500" />
        <Bookmark className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
      </div>
    </div>
  )
}
