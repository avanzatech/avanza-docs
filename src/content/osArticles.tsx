import type { ReactNode } from "react";
import { Callout, StepCard, Checklist } from "../components/content/Blocks";

// Content is grounded in the live App.jsx implementation, verified against
// the source before writing — not the original planning spec. Slugs not
// present here fall back to the placeholder in DocsArticle.
type ArticleBody = { en: ReactNode; es: ReactNode };

export const osArticles: Record<string, ArticleBody> = {
  "getting-started": {
    en: (
      <>
        <p>
          Avanza runs your daily purchasing and compliance work from five places: Sales, Avanza (your AI assistant),
          Documents, Products, and Orders — the same five tabs along the bottom of the app, always available.
        </p>
        <Callout type="tip" title="Start here every day">
          The Avanza tab is the fastest way in. It surfaces what actually needs your attention today — pending
          documents, low stock, suppliers waiting on a reply — instead of making you check five screens yourself.
        </Callout>
        <StepCard number={1} title="Check your Documents badge">
          If the Documentos tab shows a number, you have albaranes or facturas waiting to be processed. This is
          usually the first thing worth clearing each morning.
        </StepCard>
        <StepCard number={2} title="Review anything in Orders">
          The Pedidos tab shows draft orders — some created automatically from stock thresholds, some you'll create
          yourself. Nothing sends without your review first.
        </StepCard>
        <StepCard number={3} title="Ask Avanza when something looks off">
          Rather than hunting through screens, ask directly: "why is this supplier's price up this month?" or
          "what's low on stock right now?" The assistant has context on your actual inventory and orders.
        </StepCard>
        <Callout type="note" title="Common mistake">
          Treating Avanza like a live inventory counter. It isn't one — it's built for purchasing decisions and
          compliance, using real events (deliveries, staff counts, POS data), not guessed stock numbers.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          Avanza gestiona tus compras diarias y el cumplimiento normativo desde cinco secciones: Ventas, Avanza (tu
          asistente IA), Documentos, Productos y Pedidos — las mismas cinco pestañas inferiores, siempre disponibles.
        </p>
        <Callout type="tip" title="Empieza aquí cada día">
          La pestaña Avanza es la entrada más rápida. Te muestra lo que realmente necesita atención hoy — documentos
          pendientes, stock bajo, proveedores esperando respuesta — sin tener que revisar cinco pantallas tú mismo.
        </Callout>
        <StepCard number={1} title="Revisa el aviso de Documentos">
          Si la pestaña Documentos muestra un número, tienes albaranes o facturas pendientes de procesar. Suele ser
          lo primero que conviene resolver cada mañana.
        </StepCard>
        <StepCard number={2} title="Revisa lo que haya en Pedidos">
          La pestaña Pedidos muestra borradores de pedido — algunos creados automáticamente por umbrales de stock,
          otros que crearás tú mismo. Nada se envía sin que lo revises antes.
        </StepCard>
        <StepCard number={3} title="Pregunta a Avanza cuando algo no cuadre">
          En lugar de buscar en varias pantallas, pregunta directamente: "¿por qué ha subido el precio de este
          proveedor este mes?" o "¿qué producto tiene el stock más bajo ahora mismo?"
        </StepCard>
        <Callout type="note" title="Error común">
          Tratar Avanza como un contador de inventario en vivo. No lo es — está construido para decisiones de compra
          y cumplimiento normativo, usando eventos reales (entregas, conteos del personal, datos del TPV), no cifras
          de stock inventadas.
        </Callout>
      </>
    ),
  },

  pedidos: {
    en: (
      <>
        <p>
          Orders in Avanza always start as drafts. Nothing goes to a supplier without you reviewing it first —
          whether the draft was created automatically or you started it yourself.
        </p>
        <Callout type="info" title="Where drafts come from">
          Some drafts appear on their own — for example, when a drink's stock crosses the threshold you set.
          Others you create manually from a supplier's product list. Either way, they land in the same review queue.
        </Callout>
        <StepCard number={1} title="Open a draft">
          Tap into any draft in the Pedidos tab. You'll see the supplier, the items, and quantities — all editable
          before you send.
        </StepCard>
        <StepCard number={2} title="Adjust quantities if needed">
          Edits save automatically when you send — you don't need a separate "save" step.
        </StepCard>
        <StepCard number={3} title="Send or reject">
          Send goes out by email or opens a WhatsApp message pre-filled with the order — you choose per supplier,
          set up in the Proveedores view. Reject removes the draft entirely; there's no undo, so only reject drafts
          you're sure you don't want.
        </StepCard>
        <Checklist
          items={[
            "Supplier contact details are correct in Proveedores before relying on auto-send",
            "Quantities reflect what you actually need, not just the suggested threshold amount",
            "You've checked recent deliveries before reordering the same item twice",
          ]}
        />
        <Callout type="warning" title="Common mistake">
          Assuming a draft was sent because it appeared. Drafts sit and wait for you — check the badge count on the
          Pedidos tab regularly, especially if you're not in the app every day.
        </Callout>
        <p className="text-sm text-text-dim">
          Related: <em>Documentos</em> — every order eventually becomes an albarán when it's delivered.
        </p>
      </>
    ),
    es: (
      <>
        <p>
          Los pedidos en Avanza siempre empiezan como borradores. Nada llega a un proveedor sin que lo revises
          antes — se haya creado el borrador automáticamente o lo hayas iniciado tú mismo.
        </p>
        <Callout type="info" title="De dónde vienen los borradores">
          Algunos borradores aparecen solos — por ejemplo, cuando el stock de una bebida cruza el umbral que
          configuraste. Otros los creas manualmente desde la lista de productos de un proveedor. En ambos casos,
          llegan a la misma cola de revisión.
        </Callout>
        <StepCard number={1} title="Abre un borrador">
          Toca cualquier borrador en la pestaña Pedidos. Verás el proveedor, los artículos y las cantidades — todo
          editable antes de enviar.
        </StepCard>
        <StepCard number={2} title="Ajusta cantidades si hace falta">
          Los cambios se guardan automáticamente al enviar — no hace falta un paso de "guardar" aparte.
        </StepCard>
        <StepCard number={3} title="Envía o rechaza">
          Enviar lo manda por email o abre un mensaje de WhatsApp con el pedido — lo eliges por proveedor, en la
          vista Proveedores. Rechazar elimina el borrador por completo; no hay deshacer, así que rechaza solo lo
          que estés seguro de no querer.
        </StepCard>
        <Checklist
          items={[
            "Los datos de contacto del proveedor están correctos en Proveedores antes de confiar en el envío automático",
            "Las cantidades reflejan lo que realmente necesitas, no solo la cantidad sugerida por el umbral",
            "Has revisado las entregas recientes antes de repetir el mismo pedido",
          ]}
        />
        <Callout type="warning" title="Error común">
          Asumir que un borrador se envió solo porque apareció. Los borradores esperan tu acción — revisa el
          contador de la pestaña Pedidos con regularidad, sobre todo si no entras en la app cada día.
        </Callout>
        <p className="text-sm text-text-dim">
          Relacionado: <em>Documentos</em> — cada pedido acaba convirtiéndose en un albarán al recibirse.
        </p>
      </>
    ),
  },

  documentos: {
    en: (
      <>
        <p>
          Every delivery note (albarán) and invoice (factura) lives here, in one list. They look similar but do
          different jobs — mixing them up is the single most common documentation mistake in Avanza.
        </p>
        <Callout type="warning" title="Albarán vs factura">
          The albarán is the source of truth for what actually arrived — it drives stock and product history.
          The factura is for accounting and IVA — it's what you export for tax purposes. Avanza tracks both, but
          they answer different questions.
        </Callout>
        <StepCard number={1} title="Clear the badge">
          A number on the Documentos tab means something needs a decision — usually a new upload waiting to be
          matched to a supplier and order.
        </StepCard>
        <StepCard number={2} title="Export when you need accounting data">
          Three separate exports exist for three separate purposes: IVA export (accounting/tax), sales export, and
          batch invoice review. Use the one that matches what you're actually trying to do — they're not
          interchangeable.
        </StepCard>
        <Callout type="tip" title="Business value">
          Because every albarán is tied to a real delivery, your product and pricing history stays accurate without
          you manually logging anything — Avanza builds it from the documents you already have to handle anyway.
        </Callout>
        <p className="text-sm text-text-dim">
          Related: <em>Orders</em> — an order becomes an albarán once it's delivered and uploaded.
        </p>
      </>
    ),
    es: (
      <>
        <p>
          Cada albarán y factura vive aquí, en una sola lista. Se parecen, pero cumplen funciones distintas —
          confundirlos es el error de documentación más común en Avanza.
        </p>
        <Callout type="warning" title="Albarán vs factura">
          El albarán es la fuente de verdad de lo que realmente llegó — impulsa el stock y el historial de
          productos. La factura es para contabilidad e IVA — es lo que exportas para hacienda. Avanza sigue ambos,
          pero responden a preguntas distintas.
        </Callout>
        <StepCard number={1} title="Resuelve el aviso">
          Un número en la pestaña Documentos significa que algo necesita una decisión — normalmente una subida
          nueva esperando emparejarse con un proveedor y un pedido.
        </StepCard>
        <StepCard number={2} title="Exporta cuando necesites datos contables">
          Existen tres exportaciones separadas para tres propósitos distintos: exportación de IVA (contabilidad),
          exportación de ventas y revisión de facturas por lotes. Usa la que corresponda a lo que realmente
          necesitas — no son intercambiables.
        </StepCard>
        <Callout type="tip" title="Valor de negocio">
          Como cada albarán está vinculado a una entrega real, tu historial de productos y precios se mantiene
          preciso sin que tengas que anotar nada manualmente — Avanza lo construye a partir de los documentos que
          ya tienes que gestionar de todos modos.
        </Callout>
        <p className="text-sm text-text-dim">
          Relacionado: <em>Pedidos</em> — un pedido se convierte en albarán al entregarse y subirse.
        </p>
      </>
    ),
  },
};
