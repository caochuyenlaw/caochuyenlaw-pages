export async function onRequestPost({ request, env }) {
  const data = await request.json();

  if (!data?.name || !data?.phone) {
    return new Response(JSON.stringify({ ok: false, error: "Thiếu họ tên hoặc SĐT" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  await env.db.prepare(
    "INSERT INTO hoso (name, phone, amount) VALUES (?, ?, ?)"
  ).bind(
    data.name,
    data.phone,
    data.amount || ""
  ).run();

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
