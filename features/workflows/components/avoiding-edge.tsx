import { BaseEdge, type EdgeProps, useNodes } from "@xyflow/react"

type Point = { x: number; y: number }
type Rectangle = { left: number; right: number; top: number; bottom: number }

const clearance = 16

function intersectsRectangle(start: Point, end: Point, rectangle: Rectangle) {
  if (start.x === end.x) {
    return (
      start.x >= rectangle.left &&
      start.x <= rectangle.right &&
      Math.max(start.y, end.y) >= rectangle.top &&
      Math.min(start.y, end.y) <= rectangle.bottom
    )
  }

  return (
    start.y >= rectangle.top &&
    start.y <= rectangle.bottom &&
    Math.max(start.x, end.x) >= rectangle.left &&
    Math.min(start.x, end.x) <= rectangle.right
  )
}

function routeIsClear(points: Point[], obstacles: Rectangle[]) {
  return points.every((point, index) => {
    const nextPoint = points[index + 1]
    return (
      !nextPoint ||
      !obstacles.some((obstacle) =>
        intersectsRectangle(point, nextPoint, obstacle)
      )
    )
  })
}

function getRoute(source: Point, target: Point, obstacles: Rectangle[]) {
  const direct = [source, { x: target.x, y: source.y }, target]

  if (routeIsClear(direct, obstacles)) {
    return direct
  }

  const top =
    Math.min(source.y, target.y, ...obstacles.map((node) => node.top)) -
    clearance
  const bottom =
    Math.max(source.y, target.y, ...obstacles.map((node) => node.bottom)) +
    clearance
  const candidates = [
    [source, { x: source.x, y: top }, { x: target.x, y: top }, target],
    [source, { x: source.x, y: bottom }, { x: target.x, y: bottom }, target],
  ]

  return candidates.find((route) => routeIsClear(route, obstacles)) ?? direct
}

export function AvoidingEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
}: EdgeProps) {
  const nodes = useNodes()
  const obstacles = nodes
    .filter((node) => node.id !== source && node.id !== target)
    .map((node) => {
      const position = node.position
      const width = node.measured?.width ?? node.width ?? 160
      const height = node.measured?.height ?? node.height ?? 48

      return {
        left: position.x - clearance,
        right: position.x + width + clearance,
        top: position.y - clearance,
        bottom: position.y + height + clearance,
      }
    })
  const points = getRoute(
    { x: sourceX, y: sourceY },
    { x: targetX, y: targetY },
    obstacles
  )
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ")

  return <BaseEdge id={id} path={path} style={style} />
}
