import type { ReactNode } from "react";
import { Callout, StepCard, Checklist } from "../components/content/Blocks";
import ProductCardDemo from "../components/demos/ProductCardDemo";
import DashboardDemo from "../components/demos/DashboardDemo";
import PedidosDemo from "../components/demos/PedidosDemo";
import DocumentosDemo from "../components/demos/DocumentosDemo";

// Content is grounded in the live App.jsx implementation, verified against
// the source before writing — not the original planning spec. Slugs not
// present here fall back to the placeholder in DocsArticle.
type ArticleBody = { en: ReactNode; es: ReactNode };

export const osArticles: Record<string, ArticleBody> = {
  sales: {
    en: (
      <>
        <p>
          Sales is what opens first — it's your dashboard, not a separate screen. One number matters most:
          yesterday's revenue, front and center, compared against the day before.
        </p>
        <DashboardDemo />
        <Callout type="info" title="Where the numbers come from">
          Nothing here is manually entered. Revenue comes from your POS feed, costs come from processed invoices —
          the margin bar is real accounting, not an estimate.
        </Callout>
        <Callout type="tip" title="Business value">
          Seeing margin — not just revenue — next to your sales number is what actually drives decisions. A busy
          day with a thin margin tells a different story than the revenue number alone would.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          Ventas es lo primero que se abre — es tu panel principal, no una pantalla aparte. Un número importa más
          que ningún otro: la facturación de ayer, en primer plano, comparada con el día anterior.
        </p>
        <DashboardDemo />
        <Callout type="info" title="De dónde salen los números">
          Nada aquí se introduce manualmente. La facturación viene de tu TPV, los costes vienen de las facturas
          procesadas — la barra de margen es contabilidad real, no una estimación.
        </Callout>
        <Callout type="tip" title="Valor de negocio">
          Ver el margen — no solo la facturación — junto a tu número de ventas es lo que realmente guía las
          decisiones. Un día ajetreado con margen ajustado cuenta una historia distinta a la que cuenta solo la
          cifra de ventas.
        </Callout>
      </>
    ),
  },

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
        <PedidosDemo />
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
        <PedidosDemo />
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

  "avanza-chat": {
    en: (
      <>
        <p>
          Avanza is a conversation, not a form. Ask it questions the way you'd ask a manager — it has real context
          on your sales, spend, and orders, and answers from that.
        </p>
        <Callout type="tip" title="Good places to start">
          "How are sales going?", "How much have I spent?", "What should I reorder soon?" — these are the exact
          suggested prompts shown when you open the tab, because they're the questions owners actually ask.
        </Callout>
        <StepCard number={1} title="Just type the question">
          No commands, no syntax — plain language, in Spanish or English.
        </StepCard>
        <StepCard number={2} title="Confirm or reject when it proposes an action">
          If Avanza suggests doing something concrete (not just answering), you'll get a clear confirm/reject
          choice — it never takes action on your data without that explicit step.
        </StepCard>
        <StepCard number={3} title="Keep going in the same thread">
          It's one continuous conversation, not a fresh session each time — earlier context in the thread carries
          forward.
        </StepCard>
        <Callout type="note" title="Common mistake">
          Treating it like a search bar for menu navigation ("where's the export button"). It's built for
          questions about your business, not app navigation — for that, the tabs at the bottom are faster.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          Avanza es una conversación, no un formulario. Pregúntale como le preguntarías a un encargado — tiene
          contexto real sobre tus ventas, gastos y pedidos, y responde a partir de eso.
        </p>
        <Callout type="tip" title="Buenos puntos de partida">
          "¿Cómo van las ventas?", "¿Cuánto he gastado?", "¿Qué pedir pronto?" — son exactamente las sugerencias
          que aparecen al abrir la pestaña, porque son las preguntas que los dueños hacen de verdad.
        </Callout>
        <StepCard number={1} title="Simplemente escribe la pregunta">
          Sin comandos ni sintaxis especial — lenguaje normal, en español o inglés.
        </StepCard>
        <StepCard number={2} title="Confirma o rechaza cuando proponga una acción">
          Si Avanza sugiere hacer algo concreto (no solo responder), te dará una opción clara de confirmar o
          rechazar — nunca actúa sobre tus datos sin ese paso explícito.
        </StepCard>
        <StepCard number={3} title="Continúa en el mismo hilo">
          Es una conversación continua, no una sesión nueva cada vez — el contexto anterior del hilo se mantiene.
        </StepCard>
        <Callout type="note" title="Error común">
          Tratarlo como un buscador para navegar por el menú ("dónde está el botón de exportar"). Está pensado
          para preguntas sobre tu negocio, no para navegar la app — para eso, las pestañas de abajo son más
          rápidas.
        </Callout>
      </>
    ),
  },

  productos: {
    en: (
      <>
        <p>
          Productos shows your beverage stock — not food. Food is tracked separately in Kitchen Portal, through
          real events on the floor (deliveries, staff counts), not a number you maintain here.
        </p>
        <Callout type="info" title="Why the split">
          Beverages move slowly enough and are counted precisely enough that a stock number here is trustworthy.
          Food doesn't work that way — plates get made from combinations of ingredients, so Kitchen Portal tracks
          dish availability instead of trying to guess raw ingredient counts.
        </Callout>
        <ProductCardDemo />
        <StepCard number={1} title="Set a stock count">
          Tap a product, enter what you actually counted. This creates a checkpoint — the system estimates from
          there using sales and deliveries, until you correct it again.
        </StepCard>
        <StepCard number={2} title="Link a supplier before setting a reorder threshold">
          Threshold-based auto-drafting only works once a product has a supplier attached — without one, there's
          nowhere for the draft order to go.
        </StepCard>
        <StepCard number={3} title="Set threshold and order quantity">
          When stock drops to the threshold, Avanza creates a draft order automatically for the order quantity you
          set — it still waits in Pedidos for your approval, it doesn't send itself.
        </StepCard>
        <Callout type="warning" title="Common mistake">
          Expecting food items to show up here. If a product you're looking for isn't in this list, check Kitchen
          Portal's Board instead — food inventory lives there.
        </Callout>
        <p className="text-sm text-text-dim">
          Related: <em>Pedidos</em> — thresholds set here are what triggers automatic drafts there.
        </p>
      </>
    ),
    es: (
      <>
        <p>
          Productos muestra tu stock de bebidas — no de comida. La comida se controla por separado en el Portal de
          Cocina, mediante eventos reales en la cocina (entregas, conteos del personal), no una cifra que mantienes
          aquí.
        </p>
        <Callout type="info" title="Por qué la separación">
          Las bebidas se mueven con la lentitud suficiente y se cuentan con la precisión suficiente para que una
          cifra de stock aquí sea fiable. La comida no funciona así — los platos se elaboran combinando
          ingredientes, así que el Portal de Cocina sigue la disponibilidad de platos en lugar de intentar adivinar
          cantidades de ingredientes crudos.
        </Callout>
        <ProductCardDemo />
        <StepCard number={1} title="Registra un conteo de stock">
          Toca un producto, introduce lo que realmente contaste. Esto crea un punto de control — el sistema estima
          a partir de ahí usando ventas y entregas, hasta que lo corrijas de nuevo.
        </StepCard>
        <StepCard number={2} title="Vincula un proveedor antes de fijar un umbral">
          Los pedidos automáticos por umbral solo funcionan una vez que un producto tiene un proveedor vinculado —
          sin uno, no hay dónde enviar el borrador de pedido.
        </StepCard>
        <StepCard number={3} title="Fija el umbral y la cantidad a pedir">
          Cuando el stock baja al umbral, Avanza crea un borrador de pedido automáticamente por la cantidad que
          configuraste — sigue esperando tu aprobación en Pedidos, no se envía solo.
        </StepCard>
        <Callout type="warning" title="Error común">
          Esperar encontrar productos de comida aquí. Si un producto que buscas no está en esta lista, revisa el
          Tablero del Portal de Cocina — el inventario de comida vive allí.
        </Callout>
        <p className="text-sm text-text-dim">
          Relacionado: <em>Pedidos</em> — los umbrales configurados aquí son lo que dispara los borradores
          automáticos allí.
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
        <DocumentosDemo />
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
        <DocumentosDemo />
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
