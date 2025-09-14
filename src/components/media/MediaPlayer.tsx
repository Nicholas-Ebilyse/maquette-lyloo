import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  X,
  Maximize,
  Minimize
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "audio" | "video";
  src: string;
  thumbnailSrc?: string;
}

const MediaPlayer = ({ isOpen, onClose, title, type, src, thumbnailSrc }: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDuration = () => setDuration(media.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Media error:', e);
      setIsPlaying(false);
      // You could also show a toast notification here
    };
    const handleLoadStart = () => {
      console.log('Loading media:', src);
    };
    const handleCanPlay = () => {
      console.log('Media can play:', src);
    };
    
    media.addEventListener('timeupdate', updateTime);
    media.addEventListener('loadedmetadata', updateDuration);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('error', handleError);
    media.addEventListener('loadstart', handleLoadStart);
    media.addEventListener('canplay', handleCanPlay);

    return () => {
      media.removeEventListener('timeupdate', updateTime);
      media.removeEventListener('loadedmetadata', updateDuration);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('error', handleError);
      media.removeEventListener('loadstart', handleLoadStart);
      media.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  const togglePlay = async () => {
    const media = mediaRef.current;
    if (!media) return;

    try {
      if (isPlaying) {
        media.pause();
        setIsPlaying(false);
      } else {
        console.log('Attempting to play media:', src);
        await media.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing media:', error);
      setIsPlaying(false);
      // The media failed to play - could be due to various reasons:
      // - Invalid URL
      // - Network issues
      // - Browser autoplay policy
      // - Unsupported format
    }
  };

  const handleSeek = (values: number[]) => {
    const media = mediaRef.current;
    if (!media) return;
    
    const newTime = values[0];
    media.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (values: number[]) => {
    const media = mediaRef.current;
    if (!media) return;
    
    const newVolume = values[0];
    media.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const media = mediaRef.current;
    if (!media) return;
    
    if (isMuted) {
      media.volume = volume;
      setIsMuted(false);
    } else {
      media.volume = 0;
      setIsMuted(true);
    }
  };

  const skipTime = (seconds: number) => {
    const media = mediaRef.current;
    if (!media) return;
    
    media.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        aria-describedby="media-player-description"
        className={cn(
          "max-w-4xl p-0",
          isFullscreen && "max-w-full h-screen"
        )}
      >
        <div id="media-player-description" className="sr-only">
          Lecteur multimédia pour {title}
        </div>
        <div ref={containerRef} className="relative bg-black rounded-lg overflow-hidden">
          {/* Header */}
          <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white font-playfair">
                {title}
              </DialogTitle>
              <div className="flex items-center gap-2">
                {type === "video" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20"
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Error Message when no media URL */}
          {!src && (
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-xl font-semibold mb-2">Contenu en préparation</h3>
                <p className="text-white/70">
                  Ce contenu sera bientôt disponible. Les fichiers audio/vidéo sont en cours d'ajout.
                </p>
              </div>
            </div>
          )}

          {/* Media Element - only show if src exists */}
          {src && (
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {type === "video" ? (
                <video
                  ref={mediaRef as React.RefObject<HTMLVideoElement>}
                  src={src}
                  poster={thumbnailSrc}
                  className="w-full h-full object-contain"
                  onClick={togglePlay}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {thumbnailSrc ? (
                    <img
                      src={thumbnailSrc}
                      alt={title}
                      className="max-w-full max-h-full object-contain opacity-70"
                    />
                  ) : (
                    <div className="text-white text-6xl opacity-50">
                      🎵
                    </div>
                  )}
                  <audio
                    ref={mediaRef as React.RefObject<HTMLAudioElement>}
                    src={src}
                  />
                </div>
              )}
            </div>
          )}

          {/* Controls - only show if src exists */}
          {src && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/70 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => skipTime(-10)}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => skipTime(10)}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPlayer;