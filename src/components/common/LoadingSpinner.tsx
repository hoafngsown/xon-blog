export type ISVGProps = React.SVGProps<SVGSVGElement>;

export const LoadingSpinner = ({ ...props }: ISVGProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 z-[9999] flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-white opacity-50">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
        <circle
          fill="#2C4DA4"
          stroke="#2C4DA4"
          stroke-width="2"
          r="2"
          cx="90"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle
          fill="#2C4DA4"
          stroke="#2C4DA4"
          stroke-width="2"
          r="2"
          cx="100"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle
          fill="#2C4DA4"
          stroke="#2C4DA4"
          stroke-width="2"
          r="2"
          cx="110"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};
