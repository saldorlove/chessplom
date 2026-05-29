import { Fragment, useEffect, useRef, type ReactNode, type RefObject } from "react";
import type { AnalysisVariationView } from "../../hooks/useAnalysisBoard";
import type { MoveRow } from "../../hooks/useChessGame";

type HistoryRow = {
  number: number;
  white: string;
  black: string;
  whiteIndex: number | null;
  blackIndex: number | null;
};

type MoveTimeMap = {
  whiteMs?: number;
  blackMs?: number;
};

type SharedMoveHistoryProps = {
  headerRight?: ReactNode;
};

type SimpleMoveHistoryPanelProps = SharedMoveHistoryProps & {
  moveRows: MoveRow[];
  currentMoveIndex: number;
  moveTimesMs?: number[];
  emptyText?: string | null;
  onJumpToMove: (targetIndex: number | null) => void;
};

type AnalysisMoveHistoryPanelProps = SharedMoveHistoryProps & {
  mainLineRows: MoveRow[];
  currentMoveIndex: number;
  activeBranchId: string | null;
  variations: AnalysisVariationView[];
  onJumpToMainLine: (targetIndex: number | null) => void;
  onJumpToVariationMove: (
    branchId: string,
    targetIndex: number | null
  ) => void;
  onSelectVariation: (branchId: string) => void;
};

type MoveHistoryPanelProps =
  | SimpleMoveHistoryPanelProps
  | AnalysisMoveHistoryPanelProps;

function isAnalysisProps(
  props: MoveHistoryPanelProps
): props is AnalysisMoveHistoryPanelProps {
  return "mainLineRows" in props;
}

function formatMoveTime(ms: number) {
  const safeMs = Math.max(ms, 0);

  if (safeMs < 10_000) {
    return `${(safeMs / 1000).toFixed(1)}s`;
  }

  if (safeMs < 60_000) {
    return `${Math.round(safeMs / 1000)}s`;
  }

  const totalSeconds = Math.round(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getMoveTimeLabel(ms?: number) {
  if (ms === undefined || ms < 0) return "";
  return formatMoveTime(ms);
}

function MoveCellContent({
  san,
  timeMs,
}: {
  san: string;
  timeMs?: number;
}) {
  const timeLabel = getMoveTimeLabel(timeMs);

  return (
    <>
      <span className="move-history-v4-san">{san || "—"}</span>
      {timeLabel ? (
        <span className="move-history-v4-time">{timeLabel}</span>
      ) : null}
    </>
  );
}

function renderRow(
  row: HistoryRow,
  currentMoveIndex: number,
  onWhiteClick: () => void,
  onBlackClick: () => void,
  extraClass = "",
  moveTimeMap?: MoveTimeMap,
  currentMoveButtonRef?: RefObject<HTMLButtonElement | null>
) {
  const whiteIsCurrent = row.whiteIndex === currentMoveIndex;
  const blackIsCurrent = row.blackIndex === currentMoveIndex;
  const rowIsCurrent = whiteIsCurrent || blackIsCurrent;

  return (
    <div
      className={[
        "move-history-v4-row",
        rowIsCurrent ? "move-history-v4-row-current" : "",
        extraClass,
      ]
        .filter(Boolean)
        .join(" ")}
      key={`${row.number}-${row.white}-${row.black}-${row.whiteIndex}-${row.blackIndex}`}
    >
      <span className="move-history-v4-number">{row.number}.</span>

      <button
        ref={whiteIsCurrent ? currentMoveButtonRef : undefined}
        type="button"
        className={[
          "move-history-v4-cell",
          whiteIsCurrent ? "move-history-v4-current" : "",
          row.whiteIndex !== null && row.whiteIndex > currentMoveIndex
            ? "move-history-v4-future"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={onWhiteClick}
        disabled={row.whiteIndex === null}
      >
        <MoveCellContent san={row.white} timeMs={moveTimeMap?.whiteMs} />
      </button>

      <button
        ref={blackIsCurrent ? currentMoveButtonRef : undefined}
        type="button"
        className={[
          "move-history-v4-cell",
          blackIsCurrent ? "move-history-v4-current" : "",
          row.blackIndex !== null && row.blackIndex > currentMoveIndex
            ? "move-history-v4-future"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={onBlackClick}
        disabled={row.blackIndex === null}
      >
        <MoveCellContent san={row.black} timeMs={moveTimeMap?.blackMs} />
      </button>
    </div>
  );
}

function getVariationAnchorRow(startIndex: number) {
  return Math.floor(startIndex / 2) + 1;
}

function Header({ right }: { right?: ReactNode }) {
  return (
    <div className="move-history-v4-head">
      <h2>История ходов</h2>
      {right ? <div className="move-history-v4-head-right">{right}</div> : null}
    </div>
  );
}

export default function MoveHistoryPanel(props: MoveHistoryPanelProps) {
  const currentMoveButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    currentMoveButtonRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [props.currentMoveIndex]);

  if (!isAnalysisProps(props)) {
    const {
      moveRows,
      currentMoveIndex,
      moveTimesMs = [],
      emptyText = "",
      onJumpToMove,
      headerRight,
    } = props;

    function getMoveTimeMap(row: MoveRow): MoveTimeMap {
      return {
        whiteMs:
          row.whiteIndex !== null ? moveTimesMs[row.whiteIndex - 1] : undefined,
        blackMs:
          row.blackIndex !== null ? moveTimesMs[row.blackIndex - 1] : undefined,
      };
    }

    return (
      <div className="panel-block move-history-v4">
        <Header right={headerRight} />

        {moveRows.length === 0 ? (
          <p className="muted">{emptyText}</p>
        ) : (
          <div className="move-history-v4-table">
            <div className="move-history-v4-header">
              <span>#</span>
              <span>Белые</span>
              <span>Чёрные</span>
            </div>

            {moveRows.map((row) =>
              renderRow(
                row,
                currentMoveIndex,
                () => onJumpToMove(row.whiteIndex),
                () => onJumpToMove(row.blackIndex),
                "",
                getMoveTimeMap(row),
                currentMoveButtonRef
              )
            )}
          </div>
        )}
      </div>
    );
  }

  const {
    mainLineRows,
    currentMoveIndex,
    activeBranchId,
    variations,
    onJumpToMainLine,
    onJumpToVariationMove,
    onSelectVariation,
    headerRight,
  } = props;

  const variationsByAnchor = new Map<number, AnalysisVariationView[]>();

  for (const variation of variations) {
    const anchorRow = getVariationAnchorRow(variation.startIndex);
    const current = variationsByAnchor.get(anchorRow) ?? [];
    current.push(variation);
    variationsByAnchor.set(anchorRow, current);
  }

  return (
    <div className="panel-block move-history-v4">
      <Header right={headerRight} />

      {mainLineRows.length === 0 ? (
        <p className="muted">Ходов пока нет.</p>
      ) : (
        <div className="move-history-v4-table">
          <div className="move-history-v4-header">
            <span>#</span>
            <span>Белые</span>
            <span>Чёрные</span>
          </div>

          {mainLineRows.map((row) => {
            const rowVariations = variationsByAnchor.get(row.number) ?? [];

            return (
              <Fragment key={`main-${row.number}`}>
                {renderRow(
                  row,
                  activeBranchId ? -1 : currentMoveIndex,
                  () => onJumpToMainLine(row.whiteIndex),
                  () => onJumpToMainLine(row.blackIndex),
                  "",
                  undefined,
                  currentMoveButtonRef
                )}

                {rowVariations.length > 0 ? (
                  <div className="move-history-v4-inline-variations">
                    {rowVariations.map((variation, index) => (
                      <div
                        key={variation.id}
                        className={[
                          "move-history-v4-inline-variation",
                          variation.isActive ? "is-active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <button
                          type="button"
                          className="move-history-v4-inline-label"
                          onClick={() => onSelectVariation(variation.id)}
                        >
                          ↳ вариант {index + 1}
                        </button>

                        <div className="move-history-v4-inline-rail">
                          {variation.rows.map((variationRow) =>
                            renderRow(
                              variationRow,
                              variation.isActive ? currentMoveIndex : -1,
                              () =>
                                onJumpToVariationMove(
                                  variation.id,
                                  variationRow.whiteIndex
                                ),
                              () =>
                                onJumpToVariationMove(
                                  variation.id,
                                  variationRow.blackIndex
                                ),
                              "move-history-v4-row-branch"
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
