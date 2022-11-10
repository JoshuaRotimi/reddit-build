import Image from "next/image";
import {
  ChevronDownIcon,
  AtSymbolIcon,
  CameraIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import {
  HomeIcon,
  BellIcon,
  ChatBubbleBottomCenterIcon,
  PlusIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div
      className={
        "sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm items-center"
      }
    >
      <div className={"relative h-10 w-20 flex-shrink-0 cursor-pointer"}>
        <Link href={"/"}>
          <Image
            alt={"reddit logo"}
            src={
              "data:image/png;base64,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"
            }
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>

      <Link href={"/"}>
        <div className={"flex items-center mx-7 xl:min-w-[300px]"}>
          <HomeIcon className={"h-5 w-5"} />
          <p className={"flex-1 ml-2 hidden lg:inline"}>Home</p>
          <ChevronDownIcon className={"h-5 w-5"} />
        </div>
      </Link>

      <form
        className={
          "flex flex-1 items-center space-x-2 rounded-sm border border-gray-200"
        }
      >
        <AtSymbolIcon className={"h-6 w-6 text-gray-400"} />
        <input
          className={"flex-1 bg-white outline-none"}
          type="text"
          placeholder={"Search Reddit"}
        />
        <button hidden type={"submit"} />
      </form>

      <div
        className={
          "flex items-center space-x-2 mx-5 text-gray-500 hidden lg:inline-flex"
        }
      >
        <BellIcon className={"icon"} />
        <CameraIcon className={"icon"} />
        <ChatBubbleBottomCenterIcon className={"icon"} />
        <hr className={"h-10 border border-gray-100"} />
        <PlusIcon className={"icon"} />
        <SpeakerWaveIcon className={"icon"} />
        <VideoCameraIcon className={"icon"} />
      </div>
      <div className={"ml-5 flex items-center inline-flex lg:hidden"}>
        <Bars3Icon className={"icon"} />
      </div>

      {/*Sign In and Out Buttons*/}
      {session ? (
        <div
          onClick={() => signOut()}
          className={
            "hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
          }
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              alt={"user image"}
              src={"https://links.papareact.com/23l"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={"flex-1 text-xs"}>
            <p className={"truncate"}>{session?.user?.name}</p>
            <p className={"text-gray-400"}>1 Karma</p>
          </div>

          <ChevronDownIcon className={"flex-shrink-0 h-5 text-gray-400"} />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className={
            "hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
          }
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              alt={"user image"}
              src={"https://links.papareact.com/23l"}
              fill={true}
              sizes={"50vw"}
              style={{ objectFit: "contain" }}
            />
          </div>
          <p>Sign In</p>
        </div>
      )}
    </div>
  );
};

export default Header;
