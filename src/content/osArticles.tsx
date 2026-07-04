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
          Avanza is the operating system for your restaurant's back office. Everything you do to keep the kitchen
          supplied, the books clean, and the health inspector satisfied lives in one app — five tabs along the
          bottom, plus a separate Kitchen Portal for your staff. This page is the map: what each part is for, and
          why it earns its place in your day.
        </p>
        <Callout type="tip" title="The one habit that makes Avanza pay off">
          Open the <strong>Avanza</strong> tab first, every morning. It reads across every other screen and tells
          you the three or four things that actually need you today — a delivery note not yet uploaded, a drink about
          to run dry, a supplier still waiting on your reply. Two minutes here replaces fifteen minutes of checking
          everything yourself.
        </Callout>

        <p>
          Here is the whole dashboard, in the order you'll come to rely on it:
        </p>

        <StepCard number={1} title="Sales — your day in one number">
          The first thing you see: yesterday's revenue, compared to the day before, with the week and month beside
          it. But the number that matters most isn't sales — it's <strong>margin</strong>, shown right below it.
          Revenue tells you how busy you were; margin tells you whether being busy actually paid. Over weeks, this is
          the screen that tells you which changes to your menu and suppliers are quietly making or costing you money.
        </StepCard>

        <StepCard number={2} title="Avanza — the assistant that already knows your numbers">
          Instead of digging through screens, ask. "Why is my meat supplier more expensive this month?" "What's
          about to run out?" "How did last weekend compare to the one before?" Avanza answers from your real
          invoices, orders, and stock — not generic advice. The long-term value: the more you use it, the more it
          becomes the single place you go to understand your own business.
        </StepCard>

        <StepCard number={3} title="Documentos — every albarán and factura, sorted for you">
          Photograph a delivery note or invoice and Avanza reads it, files it, and pulls out the numbers. Two kinds
          of document, two jobs: <strong>albaranes</strong> (delivery notes) are the truth about what physically
          arrived; <strong>facturas</strong> (invoices) are the truth for your accountant and your IVA return. Keeping
          them straight here means your VAT export at quarter-end is already done — no shoebox of receipts.
        </StepCard>

        <StepCard number={4} title="Productos — your beverages, tracked and reordered automatically">
          This tab manages your drinks stock. Set a threshold once — "never let this beer drop below two crates" —
          and when a delivery pushes it there, Avanza drafts the reorder for you. Food isn't here; food lives in the
          Kitchen Portal, driven by what your staff actually cook and receive. The payoff: drinks reorder themselves,
          quietly, without you ever running out mid-service.
        </StepCard>

        <StepCard number={5} title="Pedidos — orders you approve, never orders that surprise you">
          Every order starts as a draft — whether Avanza created it from a low-stock threshold or you started it
          yourself. Nothing reaches a supplier until you tap approve. You choose how it sends: email for hands-off
          suppliers, WhatsApp when you want to add a note. This is the safety rail — automation does the tedious
          part, you keep the final say.
        </StepCard>

        <Callout type="info" title="And your kitchen has its own door">
          The <strong>Kitchen Portal</strong> is a separate, login-free mini-app your staff open on a tablet — its own
          link, no password, no access to your financials. It's where the day's dishes, food stock, APPCC checks, and
          team notes live. It connects to this dashboard automatically, so what happens on the line shows up in your
          numbers. There's a full section on it below.
        </Callout>

        <Callout type="note" title="What Avanza is — and isn't">
          Avanza is a purchasing and compliance brain, not a live stock counter. It never invents inventory numbers.
          Everything it knows comes from real events — a delivery you photographed, a count your staff tapped in, a
          sale from your POS. That's deliberate: decisions you can trust have to be built on things that actually
          happened, not guesses.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          Avanza es el sistema operativo de la trastienda de tu restaurante. Todo lo que haces para mantener la
          cocina abastecida, las cuentas en orden y al inspector de sanidad satisfecho vive en una sola app — cinco
          pestañas en la parte inferior, más un Portal de Cocina aparte para tu equipo. Esta página es el mapa: para
          qué sirve cada parte, y por qué se gana su sitio en tu día.
        </p>
        <Callout type="tip" title="El hábito que hace que Avanza valga la pena">
          Abre la pestaña <strong>Avanza</strong> lo primero, cada mañana. Lee todas las demás pantallas y te dice las
          tres o cuatro cosas que de verdad te necesitan hoy — un albarán sin subir, una bebida a punto de agotarse,
          un proveedor esperando tu respuesta. Dos minutos aquí sustituyen quince revisándolo todo tú mismo.
        </Callout>

        <p>
          Este es el panel completo, en el orden en que acabarás confiando en él:
        </p>

        <StepCard number={1} title="Ventas — tu día en un solo número">
          Lo primero que ves: la facturación de ayer, comparada con el día anterior, con la semana y el mes al lado.
          Pero el número que más importa no es la facturación — es el <strong>margen</strong>, justo debajo. La
          facturación te dice cuánto trabajaste; el margen te dice si trabajar tanto realmente valió la pena. Con las
          semanas, esta es la pantalla que te dice qué cambios en tu carta y tus proveedores te hacen ganar o perder
          dinero sin que lo notes.
        </StepCard>

        <StepCard number={2} title="Avanza — el asistente que ya conoce tus números">
          En vez de rebuscar por las pantallas, pregunta. "¿Por qué mi proveedor de carne está más caro este mes?"
          "¿Qué está a punto de agotarse?" "¿Cómo fue el finde pasado comparado con el anterior?" Avanza responde
          desde tus facturas, pedidos y stock reales — no consejos genéricos. El valor a largo plazo: cuanto más lo
          usas, más se convierte en el único sitio al que vas para entender tu propio negocio.
        </StepCard>

        <StepCard number={3} title="Documentos — cada albarán y factura, ordenados por ti">
          Fotografía un albarán o una factura y Avanza la lee, la archiva y extrae los números. Dos tipos de
          documento, dos funciones: los <strong>albaranes</strong> son la verdad sobre lo que llegó físicamente; las{" "}
          <strong>facturas</strong> son la verdad para tu gestor y tu declaración de IVA. Mantenerlos separados aquí
          significa que tu exportación de IVA a fin de trimestre ya está hecha — sin cajas de tickets.
        </StepCard>

        <StepCard number={4} title="Productos — tus bebidas, controladas y repuestas solas">
          Esta pestaña gestiona el stock de bebidas. Fija un umbral una vez — "que esta cerveza nunca baje de dos
          cajas" — y cuando una entrega lo alcance, Avanza te prepara el pedido de reposición. La comida no está aquí;
          la comida vive en el Portal de Cocina, movida por lo que tu equipo realmente cocina y recibe. El resultado:
          las bebidas se reponen solas, en silencio, sin que te quedes sin nada a mitad de servicio.
        </StepCard>

        <StepCard number={5} title="Pedidos — pedidos que apruebas, nunca pedidos que te sorprenden">
          Cada pedido empieza como borrador — lo haya creado Avanza desde un umbral de stock bajo o lo empieces tú.
          Nada llega a un proveedor hasta que pulsas aprobar. Tú eliges cómo se envía: email para proveedores
          automáticos, WhatsApp cuando quieres añadir una nota. Esta es la barrera de seguridad — la automatización
          hace lo tedioso, tú mantienes la última palabra.
        </StepCard>

        <Callout type="info" title="Y tu cocina tiene su propia puerta">
          El <strong>Portal de Cocina</strong> es una mini-app aparte, sin login, que tu equipo abre en una tablet —
          su propio enlace, sin contraseña, sin acceso a tus finanzas. Es donde viven los platos del día, el stock de
          comida, los controles APPCC y las notas del equipo. Se conecta a este panel automáticamente, así que lo que
          pasa en la línea aparece en tus números. Tienes una sección completa sobre él más abajo.
        </Callout>

        <Callout type="note" title="Qué es Avanza — y qué no">
          Avanza es un cerebro de compras y cumplimiento normativo, no un contador de stock en vivo. Nunca inventa
          cifras de inventario. Todo lo que sabe viene de eventos reales — una entrega que fotografiaste, un conteo
          que tu equipo introdujo, una venta de tu TPV. Es deliberado: las decisiones en las que puedes confiar deben
          construirse sobre cosas que realmente pasaron, no sobre suposiciones.
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
