export const gradientBgBase = "bg-gradient-to-tr";
export const gradientBgPurplePink = `${gradientBgBase} from-green-600 via-green-600 to-[#F3F4F6]`;
export const gradientBgDark = `${gradientBgBase} from-slate-700 via-slate-900 to-slate-800`;
export const gradientBgPinkRed = `${gradientBgBase} from-pink-400 via-[#E53F49] to-yellow-500`;

export const colorsBgLight = {
  white: "bg-[#FDFDFD] text-[#282B2A]",
  light: "bg-[#FDFDFD] text-[#282B2A] dark:bg-[#282B2A] dark:text-[#FDFDFD]",
  contrast: "bg-gray-800 text-[#FDFDFD] dark:bg-[#FDFDFD] dark:text-[#282B2A]",
  success: "bg-[#00BB7E] border-[#00BB7E] text-[#FDFDFD]",
  danger: "bg-[#E53F49] border-[#E53F49] text-[#FDFDFD]",
  warning: "bg-yellow-500 border-yellow-500 text-[#FDFDFD]",
  info: "bg-[#5B98D2] border-[#5B98D2] text-[#FDFDFD]",
};

export const colorsText = {
  white: "text-[#282B2A] dark:text-[#FDFDFD]",
  light: "text-gray-700 dark:text-slate-400",
  contrast: "dark:text-[#FDFDFD]",
  success: "text-[#00BB7E]",
  danger: "[#E53F49]",
  warning: "text-yellow-500",
  info: "text-[#5B98D2]",
};

export const colorsOutline = {
  white: [colorsText.white, "border-gray-100"],
  light: [colorsText.light, "border-gray-100"],
  contrast: [colorsText.contrast, "border-[#282B2A] dark:border-[#FDFDFD]"],
  success: [colorsText.success, "border-[#00BB7E]"],
  danger: [colorsText.danger, "border-[#E53F49]"],
  warning: [colorsText.warning, "border-yellow-500"],
  info: [colorsText.info, "border-[#5B98D2]"],
};

export const getButtonColor = (
  color,
  isOutlined,
  hasHover,
  isActive = false
) => {
  const colors = {
    ring: {
      white: "ring-gray-200 dark:ring-gray-500",
      whiteDark: "ring-gray-200 dark:ring-gray-500",
      lightDark: "ring-gray-200 dark:ring-gray-500",
      contrast: "ring-gray-300 dark:ring-gray-400",
      success: "ring-emerald-300 dark:ring-emerald-700",
      danger: "ring-red-300 dark:ring-red-700",
      warning: "ring-yellow-300 dark:ring-yellow-700",
      info: "ring-blue-300 dark:ring-blue-700",
    },
    active: {
      white: "bg-gray-100",
      whiteDark: "bg-gray-100 dark:bg-slate-800",
      lightDark: "bg-gray-200 dark:bg-slate-700",
      contrast: "bg-gray-700 dark:bg-[#FDFDFD]",
      success: "bg-emerald-700 dark:bg-emerald-600",
      danger: "bg-red-700 dark:bg-red-600",
      warning: "bg-yellow-700 dark:bg-yellow-600",
      info: "bg-blue-700 dark:bg-blue-600",
    },
    bg: {
      white: "bg-[#FDFDFD] text-black",
      whiteDark: "bg-[#FDFDFD] text-black dark:bg-[#282B2A] dark:text-[#FDFDFD]",
      lightDark: "bg-gray-100 text-black dark:bg-slate-800 dark:text-[#FDFDFD]",
      contrast: "bg-gray-800 text-[#FDFDFD] dark:bg-[#FDFDFD] dark:text-black",
      success: "bg-emerald-600 dark:bg-[#00BB7E] text-[#FDFDFD]",
      danger: "bg-red-600 dark:bg-[#E53F49] text-[#FDFDFD]",
      warning: "bg-yellow-600 dark:bg-yellow-500 text-[#FDFDFD]",
      info: "bg-blue-600 dark:bg-[#5B98D2] text-[#FDFDFD]",
    },
    bgHover: {
      white: "hover:bg-gray-100",
      whiteDark: "hover:bg-gray-100 hover:dark:bg-slate-800",
      lightDark: "hover:bg-gray-200 hover:dark:bg-slate-700",
      contrast: "hover:bg-gray-700 hover:dark:bg-[#FDFDFD]",
      success:
        "hover:bg-emerald-700 hover:border-emerald-700 hover:dark:bg-emerald-600 hover:dark:border-emerald-600",
      danger:
        "hover:bg-red-700 hover:border-red-700 hover:dark:bg-red-600 hover:dark:border-red-600",
      warning:
        "hover:bg-yellow-700 hover:border-yellow-700 hover:dark:bg-yellow-600 hover:dark:border-yellow-600",
      info: "hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600",
    },
    borders: {
      white: "border-white",
      whiteDark: "border-white dark:border-slate-900",
      lightDark: "border-gray-100 dark:border-slate-800",
      contrast: "border-gray-800 dark:border-white",
      success: "border-emerald-600 dark:border-[#00BB7E]",
      danger: "border-red-600 dark:border-[#E53F49]",
      warning: "border-yellow-600 dark:border-yellow-500",
      info: "border-blue-600 dark:border-[#5B98D2]",
    },
    text: {
      contrast: "dark:text-[#FDFDFD]",
      success: "text-emerald-600 dark:text-[#00BB7E]",
      danger: "text-red-600 dark:text-[#E53F49]",
      warning: "text-yellow-600 dark:text-yellow-500",
      info: "text-blue-600 dark:text-[#5B98D2]",
    },
    outlineHover: {
      contrast:
        "hover:bg-gray-800 hover:text-gray-100 hover:dark:bg-[#FDFDFD] hover:dark:text-black",
      success:
        "hover:bg-emerald-600 hover:text-[#FDFDFD] hover:text-[#FDFDFD] hover:dark:text-[#FDFDFD] hover:dark:border-emerald-600",
      danger:
        "hover:bg-red-600 hover:text-[#FDFDFD] hover:text-[#FDFDFD] hover:dark:text-[#FDFDFD] hover:dark:border-red-600",
      warning:
        "hover:bg-yellow-600 hover:text-[#FDFDFD] hover:text-[#FDFDFD] hover:dark:text-[#FDFDFD] hover:dark:border-yellow-600",
      info: "hover:bg-blue-600 hover:text-[#FDFDFD] hover:dark:text-[#FDFDFD] hover:dark:border-blue-600",
    },
  };

  if (!colors.bg[color]) {
    return color;
  }

  const isOutlinedProcessed =
    isOutlined && ["white", "whiteDark", "lightDark"].indexOf(color) < 0;

  const base = [colors.borders[color], colors.ring[color]];

  if (isActive) {
    base.push(colors.active[color]);
  } else {
    base.push(isOutlinedProcessed ? colors.text[color] : colors.bg[color]);
  }

  if (hasHover) {
    base.push(
      isOutlinedProcessed ? colors.outlineHover[color] : colors.bgHover[color]
    );
  }

  return base;
};
