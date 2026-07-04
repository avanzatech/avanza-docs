import type { ReactNode } from "react";
import { Callout, StepCard, Checklist } from "../components/content/Blocks";
import ProductCardDemo from "../components/demos/ProductCardDemo";
import DashboardDemo from "../components/demos/DashboardDemo";
import PedidosDemo from "../components/demos/PedidosDemo";
import DocumentosDemo from "../components/demos/DocumentosDemo";
import ExportDemo from "../components/demos/ExportDemo";
import AvanzaChatDemo from "../components/demos/AvanzaChatDemo";

// Content is grounded in the live App.jsx implementation, verified against
// the source before writing — not the original planning spec. Slugs not
// present here fall back to the placeholder in DocsArticle.
type ArticleBody = { en: ReactNode; es: ReactNode };

export const osArticles: Record<string, ArticleBody> = {
  sales: {
    en: (
      <>
        <p>
          Sales is what opens first — it's your home base, not a separate report you go looking for. It answers the
          question every owner asks before anything else in the morning: <em>how did we do?</em> The headline is
          yesterday's revenue, front and center, measured against the day before so the number has context instead of
          just sitting there.
        </p>
        <DashboardDemo />
        <p>
          Below the headline sit the numbers that turn "how did we do" into "how are we trending": this week against
          last, this month against last, your average ticket, and your busiest days. Individually they're facts;
          together they're the shape of your business — whether Tuesdays are worth staying open for, whether the new
          menu lifted the average check, whether last month's growth was real or just one good weekend.
        </p>
        <Callout type="info" title="Where the numbers come from">
          Nothing here is typed in by hand. Revenue flows from your POS; costs come from the invoices Avanza has
          already processed. So the margin bar underneath isn't a guess or a target you set — it's real accounting,
          reconciled from documents that actually arrived.
        </Callout>
        <Callout type="tip" title="The number most owners miss">
          Revenue tells you how busy you were. <strong>Margin</strong> tells you whether being busy paid. A €4,200
          Saturday at Casa Mediterránea looks great — until the margin bar shows costs ate more of it than the
          Saturday before, because the fish supplier's price crept up. That's the difference this screen exists to
          make visible. Over weeks, it's the single clearest signal of which menu changes and supplier switches are
          quietly working for you or against you.
        </Callout>
        <Callout type="note" title="What it is — and isn't">
          Sales is a mirror, not a lever. It reflects what already happened from real POS and invoice data; it never
          estimates or projects. If a day looks off, the answer is in a real event — a missed POS sync, an invoice
          not yet processed — not a rounding choice the software made.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          Ventas es lo primero que se abre — es tu base, no un informe aparte que tienes que ir a buscar. Responde la
          pregunta que todo dueño se hace antes que nada por la mañana: <em>¿cómo fue?</em> El titular es la
          facturación de ayer, en primer plano, comparada con el día anterior para que el número tenga contexto en
          vez de estar ahí suelto.
        </p>
        <DashboardDemo />
        <p>
          Debajo del titular están los números que convierten el "¿cómo fue?" en "¿cómo vamos?": esta semana contra
          la anterior, este mes contra el anterior, tu ticket medio y tus días más fuertes. Por separado son datos;
          juntos son la forma de tu negocio — si los martes vale la pena abrir, si la carta nueva subió el ticket
          medio, si el crecimiento del mes pasado fue real o solo un buen finde.
        </p>
        <Callout type="info" title="De dónde salen los números">
          Nada aquí se introduce a mano. La facturación viene de tu TPV; los costes vienen de las facturas que Avanza
          ya ha procesado. Así que la barra de margen de debajo no es una suposición ni un objetivo que fijas tú — es
          contabilidad real, cuadrada desde documentos que de verdad llegaron.
        </Callout>
        <Callout type="tip" title="El número que casi todos los dueños pasan por alto">
          La facturación te dice cuánto trabajaste. El <strong>margen</strong> te dice si trabajar tanto valió la
          pena. Un sábado de 4.200 € en Casa Mediterránea pinta genial — hasta que la barra de margen muestra que los
          costes se comieron más que el sábado anterior, porque el proveedor de pescado subió el precio. Esa es la
          diferencia que esta pantalla existe para hacer visible. Con las semanas, es la señal más clara de qué
          cambios de carta y de proveedor están trabajando a tu favor o en tu contra.
        </Callout>
        <Callout type="note" title="Qué es — y qué no">
          Ventas es un espejo, no una palanca. Refleja lo que ya pasó, con datos reales de TPV y facturas; nunca
          estima ni proyecta. Si un día se ve raro, la respuesta está en un evento real — una sincronización de TPV
          que falló, una factura sin procesar — no en un redondeo que hizo el software.
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
        <Callout type="tip" title="Why it works this way">
          Everywhere else, automation asks you to trust it blindly. Pedidos is built on the opposite idea: the
          software does the tedious part — noticing you're low, drafting the order, pre-filling the supplier and
          quantities — but the decision to spend money is always yours. Over time you'll trust the drafts more and
          glance at them less, but the safety rail never goes away. That's what makes it safe to let it run: an
          order can be wrong, but it can never surprise you.
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
        <Callout type="tip" title="Por qué funciona así">
          En todas partes, la automatización te pide confiar a ciegas. Pedidos se construye sobre la idea contraria:
          el software hace lo tedioso — detectar que vas bajo, preparar el pedido, rellenar el proveedor y las
          cantidades — pero la decisión de gastar dinero siempre es tuya. Con el tiempo confiarás más en los
          borradores y los mirarás menos, pero la barrera de seguridad nunca desaparece. Eso es lo que hace que sea
          seguro dejarlo funcionar: un pedido puede estar mal, pero nunca puede sorprenderte.
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
          Most software makes you go and find the answer. Avanza is the opposite: you ask, in plain words, and it
          reasons across everything your restaurant has ever recorded — every invoice, delivery, sale, supplier and
          product — to answer. It is not a chatbot bolted onto a dashboard. It is the intelligence layer that sits on
          top of your entire operation, and it can both <strong>tell you things</strong> and <strong>do things</strong>.
        </p>
        <AvanzaChatDemo />
        <p>
          Think of what it can do in three levels — try the prompts above to see each one in action.
        </p>
        <StepCard number={1} title="It understands — reasoning across your whole business">
          Not lookups, reasoning. "Why is my food cost up?" doesn't return a number — it traces the increase to a
          specific supplier and product, quantifies the annual impact, and tells you whether it's worth acting on.
          Ask it to compare weekends, rank suppliers by price movement, or find your most profitable dish, and it
          works it out from your real data, not averages or guesses.
        </StepCard>
        <StepCard number={2} title="It acts — building and connecting your data for you">
          This is where most people underestimate it. Avanza can <strong>create a new supplier</strong> and wire it
          up so future deliveries and invoices map to it automatically. It can <strong>add a new product</strong>,
          pulling the unit price straight from the supplier's last albarán so your cost history starts accurate. It
          can set reorder thresholds, draft orders, and connect the pieces of your operation — the tedious data entry
          that used to eat your evenings, done in a sentence.
        </StepCard>
        <StepCard number={3} title="It decides — a sounding board for real business calls">
          "Should I drop the tasting menu?" is a business decision, and Avanza answers it like an analyst: it weighs
          the menu's share of covers against its share of margin, factors in the wine it pulls, quantifies the cost
          of cutting it, and gives you a recommendation with the reasoning shown. You stay the decision-maker — but
          now you're deciding with the full picture in front of you.
        </StepCard>
        <Callout type="tip" title="Nothing happens without your say-so">
          When Avanza proposes an action — a new supplier, a product, an order — you get a clear Confirm / Reject
          choice, every time. It does the work of preparing the change; you keep the final word. Powerful and safe
          are not a trade-off here.
        </Callout>
        <Callout type="info" title="It gets sharper the more you run on it">
          Every invoice processed, every order approved, every day of sales deepens the map Avanza reasons from.
          Six months in, "why is my margin thinner than last spring?" has a precise, sourced answer — because the
          history is yours and it remembers all of it. The longer you run your restaurant on Avanza, the more it
          becomes the single place you go to understand and steer the business.
        </Callout>
        <Callout type="note" title="What to keep in mind">
          Avanza reasons and proposes; it never invents facts or acts silently. Every number it gives traces back to
          a real event you can check, and every change it makes waits for your confirmation. Ask it anything about
          your business — the more specific, the better it answers.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          La mayoría del software te obliga a ir a buscar la respuesta. Avanza es lo contrario: preguntas, en
          lenguaje normal, y razona sobre todo lo que tu restaurante ha registrado jamás — cada factura, entrega,
          venta, proveedor y producto — para responder. No es un chatbot pegado a un panel. Es la capa de
          inteligencia que se sitúa sobre toda tu operación, y puede tanto <strong>decirte cosas</strong> como{" "}
          <strong>hacer cosas</strong>.
        </p>
        <AvanzaChatDemo />
        <p>
          Piensa en lo que puede hacer en tres niveles — prueba las sugerencias de arriba para ver cada uno en acción.
        </p>
        <StepCard number={1} title="Entiende — razona sobre todo tu negocio">
          No son búsquedas, es razonamiento. "¿Por qué ha subido mi coste de comida?" no devuelve un número — rastrea
          la subida hasta un proveedor y un producto concretos, cuantifica el impacto anual y te dice si merece la
          pena actuar. Pídele comparar findes, ordenar proveedores por variación de precio o encontrar tu plato más
          rentable, y lo calcula desde tus datos reales, no desde medias ni suposiciones.
        </StepCard>
        <StepCard number={2} title="Actúa — construye y conecta tus datos por ti">
          Aquí es donde la mayoría lo subestima. Avanza puede <strong>crear un proveedor nuevo</strong> y dejarlo
          conectado para que las futuras entregas y facturas se le asignen solas. Puede <strong>añadir un producto
          nuevo</strong>, sacando el precio unitario del último albarán del proveedor para que tu historial de coste
          empiece exacto. Puede fijar umbrales de reposición, preparar pedidos y conectar las piezas de tu operación
          — la entrada de datos tediosa que antes se comía tus tardes, hecha en una frase.
        </StepCard>
        <StepCard number={3} title="Decide — un asesor para decisiones reales de negocio">
          "¿Debería quitar el menú degustación?" es una decisión de negocio, y Avanza la responde como un analista:
          pesa la cuota de cubiertos del menú frente a su cuota de margen, tiene en cuenta el vino que arrastra,
          cuantifica el coste de quitarlo y te da una recomendación con el razonamiento a la vista. Tú sigues
          decidiendo — pero ahora decides con la imagen completa delante.
        </StepCard>
        <Callout type="tip" title="Nada pasa sin tu visto bueno">
          Cuando Avanza propone una acción — un proveedor nuevo, un producto, un pedido — recibes una opción clara de
          Confirmar / Rechazar, siempre. Hace el trabajo de preparar el cambio; tú mantienes la última palabra.
          Potente y seguro no están reñidos aquí.
        </Callout>
        <Callout type="info" title="Se afina cuanto más lo usas">
          Cada factura procesada, cada pedido aprobado, cada día de ventas profundiza el mapa desde el que razona
          Avanza. A los seis meses, "¿por qué mi margen es más fino que la primavera pasada?" tiene una respuesta
          precisa y con fuente — porque el historial es tuyo y lo recuerda entero. Cuanto más gestionas tu
          restaurante con Avanza, más se convierte en el único sitio al que vas para entender y dirigir el negocio.
        </Callout>
        <Callout type="note" title="Qué tener en cuenta">
          Avanza razona y propone; nunca inventa datos ni actúa en silencio. Cada número que da se remonta a un
          evento real que puedes comprobar, y cada cambio que hace espera tu confirmación. Pregúntale lo que sea
          sobre tu negocio — cuanto más concreto, mejor responde.
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
        <Callout type="tip" title="Set it once, stop thinking about it">
          The real value isn't the count on screen today — it's what happens after you set thresholds on your
          fast-movers. Tell Avanza "Estrella Damm never below three crates" once, and from then on the reorder drafts
          itself the moment a slow week or a busy weekend pushes you there. Multiply that across every drink and the
          payoff is a bar that quietly never runs dry mid-service, without you tracking any of it in your head.
        </Callout>
        <p className="text-sm text-text-dim">
          Related: <em>Orders</em> — thresholds set here are what triggers automatic drafts there.
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
        <Callout type="tip" title="Configúralo una vez, olvídate">
          El valor real no es la cifra en pantalla de hoy — es lo que pasa después de fijar umbrales en tus productos
          de mayor rotación. Dile a Avanza "Estrella Damm nunca por debajo de tres cajas" una vez, y a partir de ahí
          el pedido se prepara solo en cuanto una semana floja o un finde fuerte te lleve al límite. Multiplícalo por
          cada bebida y el resultado es una barra que, en silencio, nunca se queda sin nada a mitad de servicio, sin
          que tengas que llevar la cuenta en la cabeza.
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
        <StepCard number={2} title="Export what you need — pick a date range, get the right sheet">
          At the top of Documentos you set one date range (it defaults to the 1st of this month through today),
          and that range feeds three separate Excel exports. They are not interchangeable — each answers a
          different question:
        </StepCard>
        <ExportDemo />
        <Callout type="info" title="What's inside each export">
          The <strong>IVA export</strong> is what your gestoría wants: every factura's supplier, taxable base, VAT
          rate, VAT amount and total, ready to file. The <strong>Sales export</strong> is your POS takings over the
          range. The <strong>Albaranes export</strong> is a line-by-line document audit — each item with its lot
          number, expiry date, and a link back to the original scanned document, which is what makes traceability
          hold up if there's ever a recall. All three come out as .xlsx, named with the date range so your folder
          stays organized on its own.
        </Callout>
        <Callout type="tip" title="Business value">
          Because every albarán is tied to a real delivery, your product and pricing history stays accurate without
          you manually logging anything — Avanza builds it from the documents you already have to handle anyway.
        </Callout>
        <Callout type="info" title="The payoff comes at quarter-end">
          Handle documents here as they arrive and your IVA return is already assembled when the gestoría asks —
          no shoebox of crumpled tickets, no late night reconciling three months at once. Casa Mediterránea's owner
          photographs each factura the day it lands; when the quarter closes, the export is one tap. That's the
          quiet, compounding value: a few seconds per document now saves a lost evening later.
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
        <StepCard number={2} title="Exporta lo que necesites — elige un rango de fechas, obtén la hoja correcta">
          Arriba en Documentos fijas un rango de fechas (por defecto del 1 de este mes hasta hoy), y ese rango
          alimenta tres exportaciones de Excel distintas. No son intercambiables — cada una responde a una pregunta
          diferente:
        </StepCard>
        <ExportDemo />
        <Callout type="info" title="Qué contiene cada exportación">
          La <strong>exportación de IVA</strong> es lo que quiere tu gestoría: por cada factura, proveedor, base
          imponible, tipo de IVA, cuota y total, lista para presentar. La <strong>exportación de ventas</strong> es
          tu recaudación de TPV del periodo. La <strong>exportación de albaranes</strong> es una auditoría documento
          a documento — cada artículo con su número de lote, caducidad y enlace al documento escaneado original, que
          es lo que hace que la trazabilidad aguante si alguna vez hay una retirada. Las tres salen en .xlsx,
          nombradas con el rango de fechas para que tu carpeta se ordene sola.
        </Callout>
        <Callout type="tip" title="Valor de negocio">
          Como cada albarán está vinculado a una entrega real, tu historial de productos y precios se mantiene
          preciso sin que tengas que anotar nada manualmente — Avanza lo construye a partir de los documentos que
          ya tienes que gestionar de todos modos.
        </Callout>
        <Callout type="info" title="La recompensa llega a fin de trimestre">
          Gestiona los documentos aquí según llegan y tu declaración de IVA ya está montada cuando la gestoría te la
          pide — sin caja de tickets arrugados, sin noches cuadrando tres meses de golpe. El dueño de Casa
          Mediterránea fotografía cada factura el día que llega; cuando cierra el trimestre, la exportación es un
          toque. Ese es el valor silencioso que se acumula: unos segundos por documento ahora te ahorran una tarde
          perdida después.
        </Callout>
        <p className="text-sm text-text-dim">
          Relacionado: <em>Pedidos</em> — un pedido se convierte en albarán al entregarse y subirse.
        </p>
      </>
    ),
  },
};
