import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps{
    post: Video;
}

/* Name props from components point of view rather than the context in which it is being used */
/** All React components must act like pure function in respect to their props */
const VideoCard: NextPage<IProps> = ({ post }) => {
    /**State is similar to props, but it is private and fully controlled by the component */

    /** isHover is set to the inital argument(false), meaning nothing happens*/
    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    /** useRef is like a box that can hold a mutable value in its current property*/
    /** the returned object will persist for the full life time of the component ie VideoCard */
    /** useRef is used to managing focus, text selection and media playback 
     * triggering imperative animations
     * to integrate with third-party DOM librairies 
    */
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if(playing){
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play(); 
            setPlaying(true);
        }
    }

  return (
    <div className="flex flex-col border b-2 border-gray-200 pb-6">
        <div>
            <div className="flex gap-3 p-2 curosr-pointer font-semibold rounded">
                <div className="md:wd-16 md:h-16 w-10 h-10">
                    <Link href="/">
                        <>
                        <Image
                            width={62}
                            height={62}
                            className="rounded-full"
                            src={post.postedBy.image} 
                            alt="profile photo"
                            layout="responsive"
                        />
                        </>
                    </Link>
                </div>
                <div> 
                    <Link href="/">
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                                {post.postedBy.userName}{` 
                                `}
                                <GoVerified className="text-blue-400 text-md"/>
                            </p>
                            <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                {post.postedBy.userName}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <div className='lg:ml-20 flex gap-4 relative'>
           {/** once mouse hover over component the state is changed to true */}
            <div onMouseEnter={() => {setIsHover(true)}}
                onMouseLeave={() => {setIsHover(false)}}
                className='rounded-3xl'>
                <Link href={`/detail/${post._id}`}>
                    <video loop 
                    ref={videoRef}
                    className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-200' 
                    src={post.video.asset.url}>

                    </video>
                </Link>
                {/** isHover state allows playing and isVideoMuted state to appear as well */}
                {isHover &&(
                    <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
                        {playing ? (
                            <button onClick={onVideoPress}>
                                <BsFillPauseFill className='text-black text-2xl lg:text-4xl'/>
                            </button>
                        ) : (
                            <button onClick={onVideoPress}>
                                <BsFillPlayFill className='text-black text-2xl lg:text-4xl'/>
                            </button>
                        )}
                        {isVideoMuted ? (
                            <button onClick={() => setIsVideoMuted(false)}>
                                <HiVolumeOff className='text-black text-2xl lg:text-4xl'/>
                            </button>
                        ) : (
                            <button onClick={() => setIsVideoMuted(true)}>
                                <HiVolumeUp className='text-black text-2xl lg:text-4xl'/>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default VideoCard
