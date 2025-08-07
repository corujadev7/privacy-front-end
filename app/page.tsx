'use client'

import { useState } from 'react'
import Image from "next/image"
import profilePicture from '../public/images/perfil-negrini.jpeg'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Camera, ImageIcon, Heart, ChevronRight } from 'lucide-react'
import { ContentCard } from "@/components/content-card"
import { SubscriptionModal } from "@/components/subscription-modal"

export default function Component() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; economy?: string } | null>(null);

  const handleOpenModal = (planName: string, price: string, economy?: string) => {
    setSelectedPlan({ name: planName, price, economy });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const contentItems = [
    {
      avatarSrc: "/perfil-negrini.jpeg",
      name: "alessandranegrini",
      username: "negrini",
      mediaSrc: "/negrini-01.jpeg", // Example image
      mediaType: 'image' as const,
      likes: 248,
      comments: 196,
    },
    {
      avatarSrc: "/perfil-negrini.jpeg",
      name: "alessandranegrini",
      username: "negrini",
      mediaSrc: "/negrini-03.jpeg", // Example video URL
      mediaType: 'image' as const,
      likes: 540,
      comments: 362,
    },
    {
      avatarSrc: "/perfil-negrini.jpeg",
      name: "alessandranegrini",
      username: "negrini",
      mediaSrc: "/video-negrini.mp4", // Example image
      mediaType: 'video' as const,
      likes: 872,
      comments: 532,
    },
    {
      avatarSrc: "/perfil-negrini.jpeg",
      name: "alessandranegrini",
      username: "negrini",
      mediaSrc: "/video-negrini-02.mp4", // Another example video URL
      mediaType: 'video' as const,
      likes: 872,
      comments: 532,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Banner */}
      <div className="bg-red-500 text-white text-center py-2 text-sm font-medium">
        ESSA PROMOÇÃO É VÁLIDA ATÉ {formattedDate}
      </div>

      {/* Header with Privacy Logo */}
      <header className="bg-white py-4 flex justify-center items-center shadow-sm">
        <Image
          src="/logo.webp"
          alt="Privacy Logo"
          width={100}
          height={24}
        />
      </header>

      <main className="max-w-3xl mx-auto bg-white shadow-lg mt-4 rounded-lg overflow-hidden">
        {/* Profile Section */}
        <div className="relative h-64 md:h-80">
          <Image
            src="/banner-novo.jpg"
            alt="Mel Maia background image"
            layout="fill"
            objectFit="cover"
            className="object-top"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-end gap-4">
              <Avatar className="w-24 h-24 border-4 border-white -mb-12">
                <AvatarImage src="/perfil-negrini.jpeg" alt="Mel Maia" />
                <AvatarFallback>MM</AvatarFallback>
              </Avatar>
              <div className="text-white">
                <h1 className="text-2xl font-bold">Alessandra Negrini</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    <span>401</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>438</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>229K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Description */}
        <div className="p-6 pt-16">
          <h2 className="text-xl font-bold">alessandranegrini</h2>
          <p className="text-sm text-gray-500 mb-4">@negrini</p>
          <p className="text-gray-700 leading-relaxed">
            Meu amor... não adianta resistir, eu sei que você quer... e eu tô aqui só pra te deixar maluco. 🔥😈 Por
            um valorzinho que nem dói... você vai ter acesso total ao meu lado mais safado e proibido. São mais de
            800 fotos e vídeos, me mostrando como você nunca viu... peladinha, provocando, brincando... me
            tocando... só pra deixar a sua imaginação no talo. 💋💦 Tem conteúdo só meu, tem com as minhas
            amigas, tem eu fazendo o que você sempre sonhou... e olha... não tem censura, não tem frescura. Só
            pura safadeza, pra te deixar duro de vontade. 👀🤤 E o melhor? Você fala comigo direto no chat... Pode
            soltar a sua fantasia, seu desejo mais escondido... eu vou adorar saber. E dependendo de como você
            se soltar... quem sabe a gente não realiza junto? 🔥🤤 Assina agora e ainda tenha acesso a uma
            chamada exclusiva comigo... só eu e você, ao vivo, sem pressa, podendo falar... ou fazer... o que a
            gente quiser. 🔞 Não fica só se masturbando com a imaginação, bebê... vem ter o conteúdo real,
            vem sentir o meu tesão de perto. Porque aqui... eu tô pronta pra te provocar, te deixar louco... e te fazer
            gozar só de me ver. 💦❤️
          </p>
        </div>

        {/* Subscriptions Section */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">Assinaturas</h2>
          <div
            className="relative bg-orange-500 text-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
            onClick={() => handleOpenModal("30 DIAS", "R$ 9,90", "+ CHAMADA DE VIDEO COMIGO HOJE!")}
          >
            <span className="absolute -top-2 left-4 bg-orange-600 text-xs font-semibold px-2 py-1 rounded-full">
              MAIS POPULAR 🔥
            </span>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-lg font-bold">30 DIAS</p>
                <p className="text-sm">+ CHAMADA DE VIDEO COMIGO HOJE!</p>
              </div>
              <p className="text-xl font-bold">R$ 9,90</p>
            </div>
          </div>

          {/* Promotions Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center cursor-pointer py-2">
              <h2 className="text-xl font-bold">Promoções</h2>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
            <div
              className="bg-gray-50 p-4 rounded-lg shadow-sm mt-2 mb-4 cursor-pointer"
              onClick={() => handleOpenModal("3 Meses", "R$ 19,90", "Economia de R$ 20,00 vs outros planos!")}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">3 Meses</p>
                  <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Economia
                  </span>
                </div>
                <p className="text-xl font-bold">R$ 19,90</p>
              </div>
            </div>
            <div
              className="bg-gray-50 p-4 rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleOpenModal("1 ANO", "R$ 69,90", "Melhor oferta")}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">1 ANO</p>
                  <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Melhor oferta
                  </span>
                </div>
                <p className="text-xl font-bold">R$ 69,90</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-2 border-t border-gray-200 mt-6">
          <div className="text-center py-3 border-b-2 border-orange-500 text-orange-500 font-semibold text-sm">
            93 postagens
          </div>
          <div className="text-center py-3 border-b-2 border-transparent text-gray-500 font-semibold text-sm">
            412 mídias
          </div>
        </div>

      {/* Content Grid */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {contentItems.map((item, index) => (
            <ContentCard
              key={index}
              avatarSrc={item.avatarSrc}
              name={item.name}
              username={item.username}
              mediaSrc={item.mediaSrc}
              mediaType={item.mediaType}
              likes={item.likes}
              comments={item.comments}
            />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-bold"
          onClick={() => handleOpenModal("30 DIAS", "R$ 9,90", "+ CHAMADA DE VIDEO COMIGO HOJE!")}>
            VEJA TUDO POR APENAS R$ 9,90
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plan={selectedPlan}
      />
    </div>
  )
}
