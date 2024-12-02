import { create } from "zustand";

const useBtnStore = create((set) => ({
    btn: [
        {
          name: "red",
          isCheck: true, // Indicates the default selected button
          color: "rgb(255, 0, 0)", // Red
          filter: 0, // Hue rotation for red
        },
        {
          name: "green",
          isCheck: false,
          color: "rgb(0, 255, 0)", // Green
          filter: 120, // Hue rotation for green
        },
        {
          name: "blue",
          isCheck: false,
          color: "rgb(0, 0, 255)", // Blue
          filter: 240, // Hue rotation for blue
        },
        {
          name:'purple',
          isCheck: false,
          color: "rgb(128, 0, 128)", // Purple
          filter: 300, // Hue rotation for purple
        },
      ],

      setBtn: (index) => set((state) => ({ btn: state.btn.map((item, i) => (i === index ? { ...item, isCheck: true } : { ...item, isCheck: false })) }))
}));

export default useBtnStore;
