export interface Artisan {
  id: string;
  name: string;
  state: string;
  craft: string;
  speciality: string;
  story: string;
  experience: number;
  quote: string;
  products: string[];
  awards?: string;
  culturalNote: string;
}

export const ARTISANS: Artisan[] = [
  {
    id: "suresh-mohapatra",
    name: "Suresh Mohapatra",
    state: "Odisha",
    craft: "Pattachitra",
    speciality: "Lord Jagannath Pattachitra narrations",
    story:
      "Born in Raghurajpur, the heritage crafts village near Puri, Suresh learned Pattachitra at his father's knee, painting the divine stories of Lord Jagannath for over three decades. His brushwork captures the cosmic dance of Mahaprabhu in the ancient Odishan tradition of lacquered cloth painting.",
    experience: 32,
    quote:
      "Every stroke is a prayer. I do not paint Lord Jagannath — He paints through me.",
    products: [
      "Jagannath Trinity panels",
      "Rath Yatra scroll paintings",
      "Dashavatar series",
    ],
    awards: "National Award for Master Craftsperson, 2019",
    culturalNote:
      "Pattachitra is inseparable from the Jagannath tradition in Puri. The sacred paintings adorn temple walls and serve as living scripture, telling stories of the Lord's divine play through each festival cycle — especially during the grand Rath Yatra when millions walk with the Lord.",
  },
  {
    id: "mita-chitrakar",
    name: "Mita Chitrakar",
    state: "West Bengal",
    craft: "Kalighat Pata & Kantha Embroidery",
    speciality: "Durga Puja festival scrolls",
    story:
      "From the Pingla storytelling tradition of Paschim Midnapore, Mita's bold, vibrant pot paintings and delicate Kantha needlework celebrate the divine feminine. Her Durga Puja panels are sought by collectors across Bengal and beyond.",
    experience: 25,
    quote:
      "Devi Durga is not just a goddess — she is the force that moves through every Bengali hand that creates.",
    products: [
      "Durga Puja pot scrolls",
      "Kantha silk sarees",
      "Goddess narrative panels",
    ],
    awards: "State Award, West Bengal Handicrafts Board, 2021",
    culturalNote:
      "West Bengal's craft tradition pulses with Durga Puja, the greatest festival of the land. Kantha embroidery carries the spirit of Maa Kali, Devi Durga, and the devotional energy that Ramakrishna Paramahansa and Swami Vivekananda embodied.",
  },
  {
    id: "biren-phukan",
    name: "Biren Phukan",
    state: "Assam",
    craft: "Muga Silk Weaving",
    speciality: "Golden Muga silk mekhela chador",
    story:
      "Biren is a fourth-generation silk weaver from Sualkuchi, the 'Manchester of Assam', where the sacred golden Muga silk — unique to the Brahmaputra valley — has been woven for centuries. He has dedicated his life to preserving the GI-tagged Muga tradition that once clothed Assamese royalty.",
    experience: 28,
    quote:
      "Muga is not silk — it is the soul of Assam woven into threads of gold.",
    products: ["Muga mekhela chador", "Eri silk gamosa", "Pat silk stoles"],
    awards: "GI Craft Excellence Award, Ministry of Textiles, 2020",
    culturalNote:
      "The craft of Muga silk weaving is intimately tied to the Shakti tradition of Maa Kamakhya, whose temple atop Nilachal hill blesses the Brahmaputra valley. Srimanta Sankardeva elevated weaving as a devotional art — many Satras at Majuli still practise traditional weaving as spiritual offering.",
  },
  {
    id: "karma-lama",
    name: "Karma Lama",
    state: "Uttarakhand",
    craft: "Thangka Painting",
    speciality: "Himalayan Buddhist Thangka scrolls",
    story:
      "Trained at a monastery in Uttarkashi, Karma has spent 22 years illuminating Thangka paintings in the ancient tradition of the Himalayan masters. His works depict the serene landscapes of Dev Bhoomi where Lord Shiva meditates eternally at Kedarnath.",
    experience: 22,
    quote:
      "In the Himalayas, every brushstroke carries the silence of Kedarnath and the breath of Lord Shiva.",
    products: ["Kedarnath Thangka", "Kailash Mandala", "Green Tara panels"],
    culturalNote:
      "Uttarakhand is Dev Bhoomi — Land of the Gods. Kedarnath Jyotirlinga, the Char Dham circuit, and the sacred towns of Rishikesh and Haridwar on the Ganga make this the spiritual heartland of Shaivite tradition. The Himalayan Rishis have meditated in these caves since the Vedic age.",
  },
  {
    id: "nazma-khatoon",
    name: "Nazma Khatoon",
    state: "Uttar Pradesh",
    craft: "Chikankari Embroidery",
    speciality: "Lucknowi Chikankari on fine muslin",
    story:
      "From the chowks of old Lucknow, Nazma inherited a needle and a tradition of whispered stitches called Chikankari — shadow-work embroidery flourishing for 400 years. She now runs a women's collective of 40 artisans, keeping this ancient craft alive with new designs.",
    experience: 18,
    quote:
      "Chikankari is a love letter stitched in white thread — it speaks without words.",
    products: [
      "Chikankari kurta sets",
      "Embroidered muslin sarees",
      "Hand-worked tablecloths",
    ],
    awards:
      "National Craft Award, Handicrafts & Handlooms Exports Corporation, 2022",
    culturalNote:
      "Uttar Pradesh is the land of Lord Ram (Ayodhya), Lord Krishna (Mathura-Vrindavan), and Kashi Vishwanath — Lord Shiva's eternal city of Varanasi. The spiritual wealth of the great Rishis, Saints, and Mahatmas nourishes every art form here.",
  },
  {
    id: "gopal-prajapat",
    name: "Gopal Prajapat",
    state: "Rajasthan",
    craft: "Blue Pottery",
    speciality: "Jaipur blue glazed ceramics",
    story:
      "Gopal is the fifth generation of the Prajapat family of Jaipur potters who have practiced the distinctive Blue Pottery technique for 150 years. His workshops near the old walled city produce iconic cobalt-and-white tiles and vessels that adorn palaces and homes across India.",
    experience: 35,
    quote:
      "Blue Pottery is not fired in the kiln alone — it is fired in the heart of Rajasthan's devotion to beauty.",
    products: [
      "Blue glazed vases",
      "Decorative wall tiles",
      "Hand-painted dinnerware sets",
    ],
    awards: "Rajasthan Ratna Shilp Puraskar, 2018",
    culturalNote:
      "Rajasthan is the land of warrior saints, the sacred Pushkar lake, and the living tradition of Mira Bai's devotional poetry to Lord Krishna. The vibrant Blue Pottery tradition embodies the Rajput spirit — aesthetic excellence as a form of worship, with every piece a tribute to the divine beauty that the great saints celebrated in song.",
  },
  {
    id: "devika-nair",
    name: "Devika Nair",
    state: "Kerala",
    craft: "Kathakali Mask Making",
    speciality: "Handcrafted Kathakali papier-mache masks",
    story:
      "Devika learned the ancient art of Kathakali mask-making from her uncle, a performer with the Kerala Kalamandalam. Her masks faithfully reproduce the elaborate Chutti face designs in papier-mache and natural pigments, making each mask a collectible devotional artwork.",
    experience: 15,
    quote:
      "A Kathakali mask is the face of the divine — Arjuna, Duryodhana, Ravana — all gods in disguise.",
    products: [
      "Kathakali character masks",
      "Theyyam ritual masks",
      "Miniature Kathakali dolls",
    ],
    culturalNote:
      "Kerala's classical arts — Kathakali, Mohiniyattam, Theyyam — are expressions of the state's deep Bhakti tradition. The sacred Guruvayur Temple, Sabarimala pilgrimage, and the shrines of Maa Bhagavathi anchor Kerala's cultural identity. Every Kathakali performance retells the Mahabharata and Ramayana through the dancer's divine eye.",
  },
  {
    id: "shanti-devi",
    name: "Shanti Devi",
    state: "Bihar",
    craft: "Madhubani Painting",
    speciality: "Kohbar and Sita-Ram wedding murals",
    story:
      "From Mithila's sacred heartland, Shanti Devi carries the Goddess tradition of Madhubani art that predates written history. Her wedding murals bless newlyweds with the eternal love of Sita-Ram, rendered in natural pigments on handmade paper in the bold Bharni style.",
    experience: 40,
    quote:
      "We painted Lord Ram and Mother Sita on our walls before we had words for art — Madhubani is our oldest prayer.",
    products: [
      "Sita-Ram marriage panels",
      "Fish motif fertility paintings",
      "Durga Maa Madhubani scrolls",
    ],
    awards: "Padma Shri, Government of India, 2007",
    culturalNote:
      "Bihar is the land of Lord Buddha's enlightenment at Bodhgaya, the sacred Mithila of Maa Sita, and the mighty Nalanda tradition of learning. Madhubani painting was born here — women painted Ram and Sita, Shiva and Parvati on their walls to invite divine blessing into daily life.",
  },
  {
    id: "hajra-bai",
    name: "Hajra Bai",
    state: "Gujarat",
    craft: "Kutch Embroidery",
    speciality: "Ahir and Rabari mirror-work embroidery",
    story:
      "From the salt marshes of Kutch, Hajra Bai belongs to the Mochi community — master embroiderers who have stitched geometric constellations and divine motifs into fabric for generations. Her blouses and wall hangings showcase the famous shisha mirror-work technique that catches light like scattered stars.",
    experience: 30,
    quote:
      "Every mirror I stitch is a little sun — it carries the light of the Rann into your home.",
    products: [
      "Kutch embroidered blouses",
      "Mirror-work wall hangings",
      "Hand-embroidered bags",
    ],
    awards: "Craft Council of India Recognition Award, 2016",
    culturalNote:
      "Gujarat is the land of Lord Krishna's Dwarka — one of the four sacred Char Dhams — and the Garba dance tradition celebrating Navratri. The Somnath Jyotirlinga, Girnar pilgrimage, and the Vaishnav Bhakti of Mirabai's Gujarat infuse every embroidery thread with deep spiritual meaning.",
  },
  {
    id: "s-subramanian",
    name: "S. Subramanian",
    state: "Tamil Nadu",
    craft: "Swamimalai Bronze Casting",
    speciality: "Panchaloha Nataraja castings",
    story:
      "Subramanian is a Sthapati from Swamimalai near Kumbakonam, the sacred town of bronze casting temples. His family has practiced the lost-wax casting method for seven generations, creating Nataraja and other Agamic deities for temples across Tamil Nadu and the world.",
    experience: 38,
    quote:
      "Nataraja is not cast in bronze — Lord Shiva casts himself, and we are merely the instruments.",
    products: [
      "Nataraja Panchaloha idols",
      "Murugan processional bronzes",
      "Ardhanarisvara panels",
    ],
    awards: "National Master Craftsperson Award, Crafts Council of India, 2015",
    culturalNote:
      "Tamil Nadu is the heart of Shaiva and Vaishnava Bhakti — land of the Nayanmars and Alvars whose devotional hymns still reverberate in thousands of living temples. Swamimalai bronzes are not mere artworks but consecrated sacred objects embodying the divine presence of Lord Shiva and Devi Parvati.",
  },
  {
    id: "gurpreet-kaur",
    name: "Gurpreet Kaur",
    state: "Punjab",
    craft: "Phulkari Embroidery",
    speciality: "Bagh and Phulkari bridal dupattas",
    story:
      "Gurpreet Kaur from Patiala is a custodian of the ancient Phulkari tradition — 'flower work' — where women stitch entire garments in vibrant silk thread on coarse khaddar cloth. Her Bagh dupattas, where flowers cover every inch of fabric, are heirloom pieces passed from mother to daughter.",
    experience: 22,
    quote:
      "Phulkari blooms from the hands of Punjab's daughters — it carries our happiness, our prayers, our weddings.",
    products: [
      "Phulkari bridal dupatta",
      "Bagh embroidered shawl",
      "Phulkari home furnishings",
    ],
    culturalNote:
      "Punjab is the land of the ten Gurus and the sacred Golden Temple at Amritsar — Harmandir Sahib. The spiritual energy of Guru Nanak's teachings and Guru Gobind Singh's devotion find expression in Punjab's craft traditions. Phulkari is created by women as acts of joyful offering, each flower a silent prayer.",
  },
  {
    id: "ramesh-thakur",
    name: "Ramesh Thakur",
    state: "Himachal Pradesh",
    craft: "Kullu Shawl Weaving",
    speciality: "Hand-woven Kullu dori pattern shawls",
    story:
      "Ramesh Thakur weaves at a handloom in the Kullu valley beneath the Dhauladhar peaks, creating distinctive geometric-banded Kullu shawls in pure wool that have warmed Himalayan shepherds and enchanted the world for centuries.",
    experience: 27,
    quote:
      "The Beas river sings to the mountains, and the mountains sing back through my loom.",
    products: [
      "Kullu wool shawls",
      "Kinnauri geometric stoles",
      "Himachali patterned blankets",
    ],
    awards: "HP State Best Weaver Award, 2019",
    culturalNote:
      "Himachal Pradesh is a land of Devi shrines — Hadimba Devi in Manali, Naina Devi, Jwala Ji, Chintpurni — and ancient temples to Lord Shiva amidst high Himalayan passes. The Kullu Dussehra, one of the world's largest Ram festivals, draws deities from 200 temples to honour Lord Raghunath.",
  },
  {
    id: "sitaram-tekam",
    name: "Sitaram Tekam",
    state: "Maharashtra",
    craft: "Warli Folk Painting",
    speciality: "Tarpa dance and harvest celebration Warli",
    story:
      "Sitaram Tekam is a Warli tribal artist from the Dahanu forests of Palghar district, where the Warli community has painted their cosmic worldview in white rice paste on mud walls since antiquity. He now translates these sacred symbols onto canvas without losing their primal spiritual energy.",
    experience: 20,
    quote:
      "Warli is the oldest language of Maharashtra — before Sanskrit, before Marathi, there was the circle and the stick figure dancing.",
    products: [
      "Warli canvas paintings",
      "Warli printed textiles",
      "Tribal ritual paintings",
    ],
    culturalNote:
      "Maharashtra is the sacred land of Vithoba at Pandharpur — whose Vari pilgrimage draws millions of Warkari devotees chanting Dnyaneshwar and Tukaram's abhangas — and the Ashtavinayak Ganesha shrines around Pune. The Warli tribal art tradition predates recorded history and carries the ancestral memory of Maharashtra's forest communities.",
  },
  {
    id: "ghulam-nabi-dar",
    name: "Ghulam Nabi Dar",
    state: "Jammu & Kashmir",
    craft: "Pashmina Weaving",
    speciality: "Pure Kani woven Pashmina shawls",
    story:
      "Ghulam Nabi Dar belongs to a family of Kani weavers in Kanihama, the ancestral village of Kashmiri Kani shawl weaving, where wooden bobbins (kanis) dance across the loom in patterns so complex that a single shawl can take 18 months to complete.",
    experience: 33,
    quote:
      "A Pashmina shawl holds the cold of the Himalayas and the warmth of Kashmir's soul — one cannot exist without the other.",
    products: [
      "Kani woven Pashmina shawls",
      "Sozni embroidered wraps",
      "Kashmir Papier-mache boxes",
    ],
    awards:
      "GI Tag Certification & Master Craftsman Recognition, J&K Handicrafts, 2017",
    culturalNote:
      "Jammu & Kashmir is the abode of Maa Vaishno Devi — one of India's most visited Shakti shrines — and the Amarnath Shiva Linga of ice, visited by millions each year. The Rishi tradition of Kashmir has long preached universal love — a spirit woven into every thread of the valley's legendary crafts.",
  },
  {
    id: "laxmi-chitrakari",
    name: "Laxmi Chitrakari",
    state: "Andhra Pradesh",
    craft: "Kalamkari",
    speciality: "Srikalahasti pen-work Kalamkari",
    story:
      "Laxmi Chitrakari practices the sacred Srikalahasti style of Kalamkari — pen-drawn narratives of the Mahabharata, Ramayana, and stories of Lord Shiva and Devi Parvati on hand-woven cotton using only natural dyes and bamboo pens. Her family has served the Srikalahasti temple for eight generations.",
    experience: 24,
    quote:
      "The pen in my hand is the pen of Lord Brahma — we are all writing the cosmic story together.",
    products: [
      "Kalamkari narrative panels",
      "Shiva-Parvati story cloths",
      "Temple story dupattas",
    ],
    awards: "Andhra Pradesh State Kalamkari Award, 2020",
    culturalNote:
      "Andhra Pradesh is sacred to Lord Venkateswara of Tirupati — the most visited temple in the world — and Srikalahasti Shiva, whose temple inspired the Kalamkari tradition. The ancient Amaravati Buddhist stupa and the sacred Krishna and Godavari rivers carry the spiritual wealth of the Telugu people across millennia.",
  },
];
