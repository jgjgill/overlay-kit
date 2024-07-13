import { type OverlayData, type OverlayItem } from './store';

export type OverlayReducerAction =
  | { type: 'ADD'; overlay: OverlayItem }
  | { type: 'OPEN'; overlayId: string }
  | { type: 'CLOSE'; overlayId: string }
  | { type: 'REMOVE'; overlayId: string }
  | { type: 'CLOSE_ALL' }
  | { type: 'REMOVE_ALL' };

export function overlayReducer(state: OverlayData, action: OverlayReducerAction): OverlayData {
  switch (action.type) {
    case 'ADD': {
      return {
        current: action.overlay.id,
        overlayOrderList: [...state.overlayOrderList, action.overlay.id],
        overlayData: {
          ...state.overlayData,
          [action.overlay.id]: action.overlay,
        },
      };
    }
    case 'OPEN': {
      return {
        ...state,
        overlayData: {
          ...state.overlayData,
          [action.overlayId]: {
            ...state.overlayData[action.overlayId],
            isOpen: true,
          },
        },
      };
    }
    case 'CLOSE': {
      const closedCurrentIndex = state.overlayOrderList.findIndex((item) => item === action.overlayId);
      const currentIndex = closedCurrentIndex - 1;

      return {
        ...state,
        current: state.overlayOrderList[currentIndex] ?? null,
        overlayData: {
          ...state.overlayData,
          [action.overlayId]: {
            ...state.overlayData[action.overlayId],
            isOpen: false,
          },
        },
      };
    }
    case 'REMOVE': {
      const remainingOverlays = state.overlayOrderList.filter((item) => item !== action.overlayId);
      if (state.overlayOrderList.length === remainingOverlays.length) {
        return state;
      }

      const copiedOverlayData = { ...state.overlayData };
      delete copiedOverlayData[action.overlayId];

      const updatedCurrent = state.current
        ? remainingOverlays.includes(state.current)
          ? state.current // close 이후 unmount가 실행된 경우
          : remainingOverlays.at(-1) ?? null // unmount만 실행해서 remainingOverlays에 current가 없는 경우
        : null; // current가 null인 경우

      return {
        // current: remainingOverlays.at(-1) ?? null, // original code
        current: updatedCurrent,
        overlayOrderList: remainingOverlays,
        overlayData: copiedOverlayData,
      };
    }
    case 'CLOSE_ALL': {
      return {
        ...state,
        overlayData: Object.keys(state.overlayData).reduce(
          (prev, curr) => ({
            ...prev,
            [curr]: {
              ...state.overlayData[curr],
              isOpen: false,
            } satisfies OverlayItem,
          }),
          {} satisfies Record<string, OverlayItem>
        ),
      };
    }
    case 'REMOVE_ALL': {
      return { current: null, overlayOrderList: [], overlayData: {} };
    }
  }
}
