"use client";
import { Button } from '@/components/shared/ui/button';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { LandingPrimaryImageCtaSection } from '@/components/landing/cta/LandingPrimaryCta';
import { LandingProductHuntAward } from '@/components/landing/social-proof/LandingProductHuntAward';
import { LandingSocialProof } from '@/components/landing/social-proof/LandingSocialProof';
import { LandingDiscount } from '@/components/landing/discount/LandingDiscount';
import LatestArticles from '@/components/blog/LatestArticles';
import { ComponentDemo } from 'demo/demo';
import { LandingProductFeature } from '@/components/landing/LandingProductFeature';
import { LandingProductFeatureKeyPoints } from '@/components/landing/LandingProductFeatureKeyPoints';
import { LandingSaleCtaSection } from '@/components/landing/cta/LandingSaleCta';
import { LandingTestimonialGrid } from '@/components/landing/testimonial/LandingTestimonialGrid';
import { LandingBandSection } from '@/components/landing/LandingBand';
import { LandingTestimonialReadMoreWrapper } from '@/components/landing/testimonial/LandingTestimonialReadMoreWrapper';
import { LandingFeatureList } from '@/components/landing/feature/LandingFeatureList';
import { LandingFaqCollapsibleSection } from '@/components/landing/LandingFaqCollapsible';
import { LandingSocialProofBand } from '@/components/landing/social-proof/LandingSocialProofBand';
import { LandingSocialProofBandItem } from '@/components/landing/social-proof/LandingSocialProofBandItem';
import { LandingProductVideoFeature } from '@/components/landing/LandingProductVideoFeature';
import { useEffect, useState } from "react";

import { LandingPricingSection } from '@/components/landing/pricing/LandingPricingSection';
import { LandingPricingPlan } from '@/components/landing/pricing/LandingPricingPlan';
import MasonryGallery from "@/components/MasonryGallery";

import { supabase } from "@/lib/supabase";
import Image from "next/image"

import { AspectRatio } from "@/components/shared/ui/aspect-ratio"


import {
  ChromeIcon,
  FigmaIcon,
  FramerIcon,
  GithubIcon,
  LayersIcon,
  LightbulbIcon,
  LineChartIcon,
  SparklesIcon,
  ThumbsUpIcon,
  ZapIcon,
  Play,
  Smartphone,
  MapPin,
  Mail,
  Anchor,
  Ship,
  ShipWheel
} from 'lucide-react';


export default function Home() {
 const [rows, setRows] = useState<any[]>([]);
   async function addUser() {
    const { data, error } = await supabase
      .from("test")
      .insert([
        {
          name: "Name5555",
        },
      ]);

    console.log(data, error);
  }
async function seed() {
  await supabase.from("test").upsert([
    { id: 1, name: "Example" },
  ]);
}

    async function loadData() {
      const { data, error } = await supabase
        .from("test")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setRows(data);
      }
    }

    loadData();


  
  return (


    
    <div className="flex flex-col w-full items-center fancy-overlay">
       
      <LandingSocialProofBand invert={false} className="hidden md:flex">


        
        <LandingSocialProofBandItem >
          1901 Thornridge Shiloh, Hawaii 81063
        </LandingSocialProofBandItem>

        <LandingSocialProofBandItem>
          needhelp@company.com
        </LandingSocialProofBandItem>

        <LandingSocialProofBandItem graphic="rating">
          Mon to Sat: 8.00 am - 7.00 pm
        </LandingSocialProofBandItem>
      </LandingSocialProofBand>

      <Header className="mb-0 lg:mb-0" />




    <div className="flex flex-col w-full items-center fancy-overlay">
      {rows.map((row) => (
        <div key={row.id}>{row.ntitle}</div>
      ))}
    </div>


      
     <AspectRatio ratio={16 / 9} > 
    <button onClick={seed}>Update User</button>
    <button onClick={addUser}>Insert User</button>
        </AspectRatio>
   <AspectRatio ratio={16 / 9} >
      <Image
        src="/static/images/slide2.jpg"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
<LandingFeatureList
        title="Awesome Features Await!"
        description="Unforgettable Sea Journeys"
        featureItems={[
          {
             icon: <Anchor />,
            title: 'Intuitive Interface',
            description:
              'Design and customize your app easily with our simple drag-and-drop interface.',
           
          },
          {
            title: 'Seamless Integration',
            description:
              'Connect your app with other tools effortlessly for a smoother workflow.',
            icon: <Ship />,
          },
          {
            title: 'Smart Analytics',
            description:
              'Gain valuable insights into user behavior and trends with our advanced analytics tools.',
            icon: <ShipWheel />,
          },
        ]}
      />
<section className="py-24">
<a
  href="https://www.youtube.com/watch?v=hddwAIXbKZo"
  target="_blank"
  rel="noopener noreferrer"
  className="relative block overflow-hidden rounded-xl"
>
  <img
    src="/static/images/div1.jpg"
    alt="Watch video"
    className="w-full object-cover"
  />

  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
    <div className="rounded-full bg-white/50 p-6">     
      <Play size={62} />    
    </div>
  </div>
</a>
</section>
      <section
  className="py-24 bg-no-repeat bg-right bg-bottom"
  style={{
    backgroundImage: "url('/static/images/shape.png')",
  }}
>

        
<LandingProductFeature
        title="Customized Boat Tours"
        descriptionComponent={
          <>
            <LandingProductFeatureKeyPoints
              keyPoints={[
                {
                  title: 'Intuitive Interface',
                  description:
                    'Design and customize your app easily with our simple drag-and-drop interface.',
                },
                {
                  title: 'Seamless Integration',
                  description:
                    'Connect your app with other tools effortlessly for a smoother workflow.',
                },
                {
                  title: 'Smart Analytics',
                  description:
                    'Gain valuable insights into user behavior and trends with our advanced analytics tools.',
                },
              ]}
            />

            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>

            <p className="text-sm">
              7 day free trial, no credit card required.
            </p>
          </>
        }
        imageSrc="/static/images/ab1.jpg"
        imageAlt="Screenshot of the product"
        imagePosition="left"
        imagePerspective="none"
 
      />
</section>

<LandingPricingSection
  title="Simple, scalable pricing"
  description="Affordable pricing plans tailored to your needs. Choose a plan that works best for you."
>
  <LandingPricingPlan
    title="Free"
    description="For small teams & personal use."
    price="$0"
  >
    <p>Up to 5 users</p>
    <p>Basic features</p>
    <p>Discord access</p>
  </LandingPricingPlan>

  <LandingPricingPlan
    title="Pro"
    description="For larger teams or businesses."
    price="$20"
    priceSuffix="/mo"
    highlighted
  >
    <p>Unlimited users</p>
    <p>AI features</p>
    <p>Priority support</p>
  </LandingPricingPlan>

  <LandingPricingPlan
    title="Enterprise"
    description="For enterprise teams & businesses."
    price="$100"
    priceSuffix="/mo"
    featured
  >
    <p>Unlimited users</p>
    <p>AI features</p>
    <p>Priority support</p>
  </LandingPricingPlan>
</LandingPricingSection>
      

<section
  className="w-full"
>
  <MasonryGallery />

</section>
      
      <LandingProductFeature
        title="Explore the Coast"
        descriptionComponent={
          <>
            Experience Nessebar like never before with our premium boat
            services.
            <Button asChild variant="outlinePrimary">
              <Link href="/read-more">Read more</Link>
            </Button>
          </>
        }
        withBackground
        variant="secondary"
        imageSrc="/static/images/product-sample.webp"
        imageAlt="Screenshot of the product"
        imagePosition="center"
        textPosition="center"
      />


    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>

      
      <LandingPrimaryImageCtaSection
  title="Landing page in minutes"
  description="Get 10x more done with Shadcn UI, React & Next.js, and say goodbye to repetitive tasks. You'll never go back."
  imageSrc="/static/images/shipixen/product/1.webp"
  imageAlt="Sample image"
>
  <Button size="xl" asChild>
    <a href="#">Buy now</a>
  </Button>
</LandingPrimaryImageCtaSection>

<div className="-mx-2 flex flex-wrap overflow-hidden xl:-mx-2">
  <div className="my-1 w-full overflow-hidden px-2 xl:my-1 xl:w-1/2 xl:px-2">
    ![Image one](https://picsum.photos/800/400?random=1)
  </div>
  <div className="my-1 w-full overflow-hidden px-2 xl:my-1 xl:w-1/2 xl:px-2">
    ![Image two](https://picsum.photos/800/400?random=2)
  </div>
  <div className="my-1 w-full overflow-hidden px-2 xl:my-1 xl:w-1/2 xl:px-2">
    ![Image three](https://picsum.photos/800/400?random=3)
  </div>
  <div className="my-1 w-full overflow-hidden px-2 xl:my-1 xl:w-1/2 xl:px-2">
    ![Image four](https://picsum.photos/800/400?random=4)
  </div>
</div>
      
      <LandingPrimaryImageCtaSection
        title="nessebarboats"
        description="nessebarboats"
        imageSrc="/static/images/product-sample.webp"
        withBackground
        withBackgroundGlow
        leadingComponent={<LandingProductHuntAward />}
      >
        <Button size="xl" asChild>
          <Link href="/signup">Get Started</Link>
        </Button>

        <Button size="xl" asChild variant="outlinePrimary">
          <Link href="/read-more">Read more</Link>
        </Button>

        <LandingDiscount
          discountValueText="30% off"
          discountDescriptionText="for the first 10 customers (2 left)"
        />

        <LandingSocialProof
          className="w-full mt-12"
          showRating
          numberOfUsers={99}
          suffixText="happy users"
          avatarItems={[
            {
              imageSrc: 'https://picsum.photos/id/64/100/100',
              name: 'John Doe',
            },
            {
              imageSrc: 'https://picsum.photos/id/65/100/100',
              name: 'Jane Doe',
            },
            {
              imageSrc: 'https://picsum.photos/id/669/100/100',
              name: 'Alice Doe',
            },
          ]}
        />
      </LandingPrimaryImageCtaSection>

      <LandingProductFeature
        title="Customized Boat Tours"
        descriptionComponent={
          <>
            <LandingProductFeatureKeyPoints
              keyPoints={[
                {
                  title: 'Intuitive Interface',
                  description:
                    'Design and customize your app easily with our simple drag-and-drop interface.',
                },
                {
                  title: 'Seamless Integration',
                  description:
                    'Connect your app with other tools effortlessly for a smoother workflow.',
                },
                {
                  title: 'Smart Analytics',
                  description:
                    'Gain valuable insights into user behavior and trends with our advanced analytics tools.',
                },
              ]}
            />

            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>

            <p className="text-sm">
              7 day free trial, no credit card required.
            </p>
          </>
        }
        imageSrc="/static/images/backdrop-19.webp"
        imageAlt="Screenshot of the product"
        imagePosition="left"
        imagePerspective="none"
      />

      <LandingProductFeature
        title="Luxury Fleet Selection"
        descriptionComponent={
          <>
            <p>
              Our state-of-the-art fleet features an array of boats, from sleek
              yachts to comfortable motorboats, ensuring a perfect fit for every
              occasion and group size. Each vessel is well-maintained, offering
              you a smooth and safe journey while you soak in the breathtaking
              views of the sea and surrounding landscapes.
            </p>

            <LandingProductFeatureKeyPoints
              keyPoints={[
                {
                  title: 'Rock-Solid Security',
                  description:
                    'Rest assured, your data is safe with our top-notch security measures.',
                },
                {
                  title: 'Automatic Updates',
                  description:
                    'Never miss out on the latest features - our app updates itself automatically!',
                },
                {
                  title: 'Scalability on Demand',
                  description:
                    'Grow your app along with your business needs, effortlessly expanding to meet demand.',
                },
              ]}
            />

            <Button asChild variant="outlinePrimary">
              <Link href="/read-more">Read more</Link>
            </Button>

            <p className="text-sm">Get started with our free tier.</p>
          </>
        }
        imageSrc="/static/images/backdrop-20.webp"
        imageAlt="Screenshot of the product"
        imagePosition="right"
        imagePerspective="none"
        withBackground
        withBackgroundGlow
        variant="secondary"
        backgroundGlowVariant="secondary"
      />

      <LandingProductFeature
        title="Advanced Navigation Systems"
        descriptionComponent={
          <>
            <p>
              Equipped with cutting-edge navigation technologies, our boats
              guarantee a secure and efficient travel experience. With precise
              mapping options and real-time weather updates, you can relax
              knowing that your adventure is guided by the latest in maritime
              technology.
            </p>

            <Button asChild variant="outlinePrimary">
              <Link href="/read-more">Read more</Link>
            </Button>

            <p className="text-sm">First month is on us.</p>
          </>
        }
        imageSrc="/static/images/backdrop-5.webp"
        imageAlt="Screenshot of the product"
        imagePosition="left"
        imagePerspective="none"
        variant="secondary"
      />

      <LandingBandSection
        title="4.9/5 stars"
        description="Our customers love our product."
        supportingComponent={
          <LandingSocialProof
            showRating
            numberOfUsers={99}
            avatarItems={[
              {
                imageSrc: 'https://picsum.photos/id/64/100/100',
                name: 'John Doe',
              },
              {
                imageSrc: 'https://picsum.photos/id/65/100/100',
                name: 'Jane Doe',
              },
              {
                imageSrc: 'https://picsum.photos/id/669/100/100',
                name: 'Alice Doe',
              },
            ]}
          />
        }
      />


      <LandingSaleCtaSection
        title="Book Your Adventure Today"
        description="Don’t miss out on the chance to explore Nessebar’s rich history and breathtaking shores. Secure your spot with Nessebar Boats now and enjoy exclusive offers for early bookings. Your unforgettable adventure awaits!"
        ctaHref={'#'}
        ctaLabel={'Pre-order now'}
        withBackgroundGlow
      />

      <LandingTestimonialReadMoreWrapper size="md">
        <LandingTestimonialGrid
          title="What Our Customers Are Saying"
          description="Hear from those who have experienced our exceptional boat rental service and stunning adventures on the water."
          testimonialItems={[
            {
              name: 'Sofia Markova',
              text: 'Incredible experience! The sunset cruise was breathtaking—absolutely the highlight of our vacation.',
              handle: '@sofia_markova',
              imageSrc: 'https://picsum.photos/id/64/100/100',
            },
            {
              name: 'Daniel Petrov',
              text: 'I loved the flexibility and freedom of exploring Nessebar by boat. Definitely a must-try!',
              handle: '@daniel_petrov',
              imageSrc: 'https://picsum.photos/id/65/100/100',
            },
            {
              name: 'Ella Ivanova',
              text: 'The staff were so friendly and knowledgeable. They really made our day on the water unforgettable.',
              handle: '@ella_ivanova',
              imageSrc: 'https://picsum.photos/id/669/100/100',
              featured: true,
            },
            {
              name: 'Viktor Nikolov',
              text: 'Affordable prices and amazing views! A truly unique way to see the coast.',
              handle: '@viktor_nikolov',
              imageSrc: 'https://picsum.photos/id/829/100/100',
            },
            {
              name: 'Marina Dimitrova',
              text: 'The boat was in pristine condition, and the experience was well worth every penny. Highly recommend!',
              handle: '@marina_dimitrova',
              imageSrc: 'https://picsum.photos/100/100.webp?random=2',
            },
            {
              name: 'Georgi Zlatev',
              text: 'Fantastic outing with friends! We couldn’t have asked for a better day on the sea.',
              handle: '@georgi_zlatev',
              imageSrc: 'https://picsum.photos/100/100.webp?random=3',
            },
          ]}
          withBackgroundGlow
          withBackground
        />
      </LandingTestimonialReadMoreWrapper>

      <LandingFeatureList
        title="Awesome Features Await!"
        description="Explore the fantastic features of our AI app:"
        featureItems={[
          {
            title: 'Intuitive Interface',
            description:
              'Design and customize your app easily with our simple drag-and-drop interface.',
            icon: <LayersIcon />,
          },
          {
            title: 'Seamless Integration',
            description:
              'Connect your app with other tools effortlessly for a smoother workflow.',
            icon: <LineChartIcon />,
          },
          {
            title: 'Smart Analytics',
            description:
              'Gain valuable insights into user behavior and trends with our advanced analytics tools.',
            icon: <SparklesIcon />,
          },
          {
            title: 'Rock-Solid Security',
            description:
              'Rest assured, your data is safe with our top-notch security measures.',
            icon: <LightbulbIcon />,
          },
          {
            title: 'Automatic Updates',
            description:
              'Never miss out on the latest features - our app updates itself automatically!',
            icon: <ZapIcon />,
          },
          {
            title: 'Scalability on Demand',
            description:
              'Grow your app along with your business needs, effortlessly expanding to meet demand.',
            icon: <ThumbsUpIcon />,
          },
          {
            title: 'Intelligent Assistance',
            description:
              'Receive personalized recommendations and insights tailored to your workflow, helping you make informed decisions and work more efficiently.',
            icon: <ChromeIcon />,
          },
          {
            title: 'Seamless Collaboration',
            description:
              'Easily collaborate with team members and clients in real-time, fostering productivity and enhancing communication across projects.',
            icon: <FigmaIcon />,
          },
          {
            title: 'Advanced Customization',
            description:
              'Tailor your app to fit your unique requirements with extensive customization options, ensuring it aligns perfectly with your business objectives.',
            icon: <FramerIcon />,
          },
        ]}
      />

      <LandingFaqCollapsibleSection
        title="Frequently Asked Questions"
        description="Here you will find answers to some common questions about our services, ensuring you have all the information needed to make the best decision for your boating experience."
        faqItems={[
          {
            question: 'What types of boats are available for rental?',
            answer:
              'We offer a variety of boats including luxury motor yachts, traditional fishing boats, and comfortable family vessels. Each option is well-maintained and tailored to different leisure activities, so you can choose based on your preferences.',
          },
          {
            question: 'Do I need a boating license to rent a boat?',
            answer:
              'In most cases, no specialized boating license is required to rent our self-drive boats. However, we provide a thorough orientation and safety briefing to ensure you feel confident during your outing.',
          },
          {
            question: 'What is included in the rental price?',
            answer:
              'The rental price includes the boat, safety equipment, and a complimentary briefing session. Additional services like fishing gear or guided tours can be arranged at an extra cost to enhance your boating experience.',
          },
        ]}
        withBackground
      />

      <section className="container-wide mt-12 p-4">
        <LatestArticles />
      </section>

      <div className="w-full flex flex-col items-center gap-8 md:gap-16">
        <section className="container-ultrawide">
          <ComponentDemo />
        </section>
      </div>

      <Footer />
    </div>
  );
}
