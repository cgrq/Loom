import Image from 'next/image';
import avatar from './lee.png';

export default function Home() {
  // "alt" is now required for improved accessibility
  // optional: image files can be colocated inside the app/ directory
  return (
    <Image alt="leeerob" src={avatar} placeholder="blur" />
  );
}