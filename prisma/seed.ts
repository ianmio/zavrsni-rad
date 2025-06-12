import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    const kayakTour = await prisma.tour.create({
      data: {
        name: 'Coastal Kayak Adventure',
        address: 'Split, Hrvatska',
        description:
          'Join our Coastal Kayak Adventure for a thrilling paddle along the pristine beaches of Hvar. Bask in the sun and explore hidden coves and sea caves while soaking up the Adriatic breeze. Perfect for families and adventure enthusiasts alike, this daytime experience will leave you with unforgettable memories.',
        pricePerPersonInEuro: 40,
        maxGuests: 12,
        durationInMinutes: 150,
        latitude: 43.1729,
        longitude: 16.441,
        startTime: '16:00',
        imageUrl:
          'https://utfs.io/f/j8jpgJGaMTY1OXvcq8DarjngSY6FJu0hteW7p3BbR29qlEoy',
      },
    });

    const ziplineTour = await prisma.tour.create({
      data: {
        name: 'Sunset Zipline Tour',
        address: 'Split, Hrvatska',
        description:
          'Soar above the Dalmatian coast on our Sunset Zipline Tour! Fly through the air with stunning views of the Adriatic Sea as the sun sets behind the mountains. This high-adrenaline activity is perfect for thrill-seekers and offers breathtaking panoramas you won’t forget.',
        pricePerPersonInEuro: 55,
        latitude: 43.1729,
        longitude: 16.441,
        maxGuests: 8,
        durationInMinutes: 120,
        startTime: '18:00',
        imageUrl:
          'https://ben2bqpul6.ufs.sh/f/deRPmiOzHyFeLE64mkcArjT13Lm2ulgDQ9eFa7JhScdpwqtn',
      },
    });

    const quadTour = await prisma.tour.create({
      data: {
        name: 'Night Quad Adventure',
        address: 'Split, Hrvatska',
        description:
          'Embark on a thrilling Night Quad Adventure through the rugged landscapes of Dalmatia. Navigate off-road trails under the stars and discover the wild beauty of Croatia after dark. Ideal for adrenaline lovers looking to explore nature in an exciting new way.',
        pricePerPersonInEuro: 60,
        latitude: 43.1729,
        longitude: 16.441,
        maxGuests: 6,
        durationInMinutes: 90,
        startTime: '20:00',
        imageUrl:
          'https://ben2bqpul6.ufs.sh/f/deRPmiOzHyFemJRDe4ngni8dUw0AtEPrYN94TyCZ1KR5OIVS',
      },
    });

    console.log('Created Tours:', {
      kayakTour,
      ziplineTour,
      quadTour,
    });

    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    console.error('Error while seeding data: \n', error);
    throw error;
  }
};

main().catch(err => {
  console.warn('Error While generating Seed: \n', err);
});
