"use client"

import Image from "next/image"

const mainNews = {
  title: "Apeiron Седьмой Сезон в Самом Разгаре",
  description:
    "Apeiron Дает Новый Шанс Заработать USDC Сезон 7 в Apeiron продлится с 7 июля по 18 августа и представит новый класс, новую функцию под названием «Chronomerging», множество улучшений и изменений...",
  category: "Новости",
  date: "8 июля, 2025",
  imageUrl: "/placeholder.svg?width=800&height=500",
}

const sideNews = [
  {
    title: "EVE Frontier Доступна Бесплатно до 7 июля",
    category: "Новости",
    date: "2 июля, 2025",
    imageUrl: "/placeholder.svg?width=150&height=100",
  },
  {
    title: "Lumiterra Представляет MegaDrop Часть 1",
    category: "Новости",
    date: "27 июня, 2025",
    imageUrl: "/placeholder.svg?width=150&height=100",
  },
  {
    title: "BloodLoop Вышла в EGS с Аирдроп Кампанией на $15 тыс.",
    category: "Новости",
    date: "26 июня, 2025",
    imageUrl: "/placeholder.svg?width=150&height=100",
  },
]

const bottomNews = [
  {
    title: "Tokyo Beast: Крупнейший Чемпионат с Большими Призовыми",
    description:
      "Крупнейший турнир Tokyo Beast стартует 21 июня. Крупнейший турнир Tokyo Beast стартует в эту субботу, с главным призом в $14 500 и более чем $100...",
    category: "Новости",
    date: "20 июня, 2025",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
  {
    title: "Guild of Guardians: 15 Сезон уже Здесь!",
    description:
      "15 Сезон Guild of Guardians Уже Доступен Guild of Guardians запустила 15 сезон, четырехнедельное соревнование, охватывающее июнь-июль 2025 года. Ивент предлагает призовой фонд, в размере...",
    category: "Новости",
    date: "17 июня, 2025",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
  {
    title: "Seraph: Третий Сезон уже Запущен!",
    description:
      "Третий Сезон Seraph с 5000000 $SERAPH Призовых Уже Доступен Темная фэнтезийная блокчейн-RPG Seraph запустила свой 3-й сезон 12 июня в 03:00 UTC. Новый сезон принесет...",
    category: "Новости",
    date: "13 июня, 2025",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
  {
    title: "Spellborne: Новый Ивент Enchanted Guild Wars",
    description:
      "Новый Ивент в Spellborne с Призовым Фондом 250k $BONE Разработчик инди-игр Mon Studios запустили ивент Enchanted Guild Wars (EGW), в Spellborne предоставляющего игрокам возможность объединиться...",
    category: "Новости",
    date: "9 июня, 2025",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
]

export default function NewsPage() {
  return (
    <div className="bg-[#080F1A] text-[#DCEFFF] min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Новости</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-12 rounded-full"></div>

        {/* Top Section: Featured and Side News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Featured News */}
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-4">
              <Image
                src={mainNews.imageUrl || "/placeholder.svg"}
                alt={mainNews.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-blue-400 mb-2">
              <span>{mainNews.category}</span>
              <span>{mainNews.date}</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{mainNews.title}</h2>
            <p className="text-[#DCEFFF]/70">{mainNews.description}</p>
          </div>

          {/* Side News List */}
          <div className="space-y-6">
            {sideNews.map((news, index) => (
              <div key={index} className="flex items-start space-x-4 group cursor-pointer">
                <div className="flex-shrink-0 w-32 h-20 relative rounded-md overflow-hidden">
                  <Image
                    src={news.imageUrl || "/placeholder.svg"}
                    alt={news.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold leading-tight mb-1 group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-[#DCEFFF]/50">
                    <span>{news.category}</span>
                    <span>•</span>
                    <span>{news.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bottomNews.map((news, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                <Image
                  src={news.imageUrl || "/placeholder.svg"}
                  alt={news.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{news.title}</h3>
              <p className="text-sm text-[#DCEFFF]/70 mb-2">{news.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
