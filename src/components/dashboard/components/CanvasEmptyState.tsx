export const CanvasEmptyState = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
      <div className="mb-4 flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2">Drag elements onto the canvas</h3>
        <p className="text-sm">Start building your dashboard by dragging elements from the left panel</p>
      </div>
    </div>
  );
};