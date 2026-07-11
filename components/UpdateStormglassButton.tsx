"use client";

export default function UpdateStormglassButton() {
  async function updateData() {
    const res = await fetch("/api/stormglass/update", {
      method: "POST",
    });

    const json = await res.json();

    alert(json.success ? "Updated" : "Failed");
  }

  return (
    <button
      onClick={updateData}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      Update Stormglass
    </button>
  );
}
