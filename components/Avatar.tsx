import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {
  seed?: string;
  large?: boolean;
};

const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession();

  return (
    <div
      className={`relative overflow-hidden h-10 w-10 rounded-full border border-gray-300 bg-white ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          session?.user?.name || seed
        }.svg`}
        alt={"avatar"}
        fill={true}
        sizes={"50vw"}
      />
    </div>
  );
};

export default Avatar;
