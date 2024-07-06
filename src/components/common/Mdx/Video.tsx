type Props = {
  id: string;
};

export default function MdxVideo({ id }: Props) {
  return (
    <div className="my-[1.5rem] aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
