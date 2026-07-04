import type { ReactNode } from "react";
import { Callout, StepCard } from "../components/content/Blocks";
import {
  KitchenHomeDemo,
  KitchenBoardDemo,
  KitchenAppccDemo,
  KitchenOrdersDemo,
  KitchenNotesDemo,
} from "../components/demos/KitchenTabDemos";

type ArticleBody = { en: ReactNode; es: ReactNode };

export const kitchenArticles: Record<string, ArticleBody> = {
  "kitchen-home": {
    en: (
      <>
        <p>
          Kitchen Portal's home screen shows exactly one thing that needs attention — not a dashboard full of
          numbers. It picks the single most urgent item and puts it front and center.
        </p>
        <KitchenHomeDemo />
        <Callout type="info" title="Priority order">
          It checks in this order: dishes completely out of stock first, then deliveries waiting for APPCC
          registration, then dishes running low, and only shows "all good" once none of those apply.
        </Callout>
        <StepCard number={1} title="Select which dishes to track, once">
          The first time anyone opens the portal, it asks which dishes to watch. This choice is saved to that
          device — it's deliberate, not automatic, because not every dish needs floor-level tracking.
        </StepCard>
        <StepCard number={2} title="Check the card at the top each time you open it">
          That's the one thing to look at. If it says "all good," you don't need to dig further.
        </StepCard>
        <Callout type="tip" title="Business value">
          Kitchen staff get a phone-screen-sized answer to "what needs doing right now" without navigating menus
          during service — the four quick actions below (Board, APPCC, Orders, Notes) cover everything else.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          La pantalla de inicio del Portal de Cocina muestra exactamente una cosa que necesita atención — no un
          panel lleno de cifras. Elige el elemento más urgente y lo pone en primer plano.
        </p>
        <KitchenHomeDemo />
        <Callout type="info" title="Orden de prioridad">
          Comprueba en este orden: primero los platos completamente sin stock, después las entregas esperando
          registro APPCC, luego los platos con stock bajo, y solo muestra "todo en orden" cuando ninguno aplica.
        </Callout>
        <StepCard number={1} title="Selecciona qué platos seguir, una vez">
          La primera vez que alguien abre el portal, pregunta qué platos vigilar. Esta elección se guarda en ese
          dispositivo — es deliberada, no automática, porque no todos los platos necesitan seguimiento en cocina.
        </StepCard>
        <StepCard number={2} title="Revisa la tarjeta superior cada vez que abras la app">
          Eso es lo único que hay que mirar. Si dice "todo en orden", no hace falta profundizar más.
        </StepCard>
        <Callout type="tip" title="Valor de negocio">
          El personal de cocina obtiene, en el tamaño de un móvil, la respuesta a "qué hace falta hacer ahora" sin
          navegar menús durante el servicio — las cuatro acciones rápidas de abajo (Tablero, APPCC, Pedidos, Notas)
          cubren el resto.
        </Callout>
      </>
    ),
  },

  "kitchen-board": {
    en: (
      <>
        <p>
          The Board shows stock status for the dishes selected on Home — not every dish, only the ones chosen for
          tracking.
        </p>
        <KitchenBoardDemo />
        <StepCard number={1} title="Add or remove dishes from tracking">
          The Board opens in editing mode the first time, or whenever nothing's selected yet. Choose only what's
          actually worth watching — a short list gets checked; a long one gets ignored.
        </StepCard>
        <StepCard number={2} title="Read the status colors">
          Red means out of stock, amber means below the low-stock threshold. Both feed directly into what Home
          shows as the day's priority.
        </StepCard>
        <Callout type="warning" title="Common mistake">
          Selecting every dish "to be safe." The Board is only useful if it's short enough to glance at during
          service — treat it as a watchlist, not a full menu inventory.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          El Tablero muestra el estado de stock de los platos seleccionados en Inicio — no todos los platos, solo
          los elegidos para seguimiento.
        </p>
        <KitchenBoardDemo />
        <StepCard number={1} title="Añade o quita platos del seguimiento">
          El Tablero se abre en modo edición la primera vez, o siempre que no haya nada seleccionado. Elige solo lo
          que realmente merece la pena vigilar — una lista corta se revisa; una larga se ignora.
        </StepCard>
        <StepCard number={2} title="Interpreta los colores de estado">
          Rojo significa sin stock, ámbar significa por debajo del umbral de stock bajo. Ambos alimentan
          directamente lo que Inicio muestra como prioridad del día.
        </StepCard>
        <Callout type="warning" title="Error común">
          Seleccionar todos los platos "por si acaso". El Tablero solo es útil si es lo bastante corto para
          revisarlo de un vistazo durante el servicio — trátalo como una lista de vigilancia, no un inventario
          completo del menú.
        </Callout>
      </>
    ),
  },

  "kitchen-appcc": {
    en: (
      <>
        <p>
          APPCC is where you record food-safety traceability: for each product on an invoice, its lot number and
          expiry date, plus the reception check for the whole delivery. This is the record that has to hold up if a
          product is ever recalled — so it's built to be fast, not a paperwork chore.
        </p>
        <KitchenAppccDemo />
        <StepCard number={1} title="Open the invoice that needs lots registered">
          Registration is per invoice: any factura with items still missing a lot number shows up as pending, and
          Home points you straight to it. Each line-item on that invoice gets its own lot number and expiry date.
        </StepCard>
        <StepCard number={2} title="Scan the barcode — it fills lot and expiry for you">
          Point the camera at the product's barcode. Avanza reads the GS1 code and fills in both the lot number and
          the expiry date automatically, so you're not squinting at tiny digits and typing them by hand. You can
          still type them manually for anything that won't scan.
        </StepCard>
        <StepCard number={3} title="Confirm the reception check for the delivery">
          Once per delivery, record the reception temperature and mark whether condition and appearance passed —
          the two go/no-go checks. High-temperature deliveries get flagged (refrigerated goods should arrive at 7°C
          or below).
        </StepCard>
        <Callout type="warning" title="Common mistake">
          Marking "NO_LOTE" out of habit to move faster. Only use it when a product genuinely has no lot code on it
          (loose salt, some produce). Scanning the real lot is what makes traceability actually work — "NO_LOTE"
          everywhere means that if there's a recall, you can't prove what you served.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          APPCC es donde registras la trazabilidad de seguridad alimentaria: por cada producto de una factura, su
          número de lote y su fecha de caducidad, más el control de recepción de toda la entrega. Es el registro que
          tiene que aguantar si alguna vez se retira un producto — por eso está pensado para ser rápido, no un
          trámite.
        </p>
        <KitchenAppccDemo />
        <StepCard number={1} title="Abre la factura que necesita registrar lotes">
          El registro es por factura: cualquier factura con artículos que aún no tienen número de lote aparece como
          pendiente, e Inicio te lleva directo a ella. Cada línea de esa factura recibe su propio número de lote y
          fecha de caducidad.
        </StepCard>
        <StepCard number={2} title="Escanea el código — rellena lote y caducidad por ti">
          Apunta la cámara al código de barras del producto. Avanza lee el código GS1 y rellena automáticamente
          tanto el número de lote como la caducidad, así no forzas la vista con dígitos diminutos ni los escribes a
          mano. Siempre puedes introducirlos manualmente para lo que no escanee.
        </StepCard>
        <StepCard number={3} title="Confirma el control de recepción de la entrega">
          Una vez por entrega, registra la temperatura de recepción y marca si el estado y el aspecto son correctos
          — los dos controles obligatorios. Las entregas con temperatura alta se señalan (los refrigerados deben
          llegar a 7°C o menos).
        </StepCard>
        <Callout type="warning" title="Error común">
          Marcar "NO_LOTE" por costumbre para ir más rápido. Úsalo solo cuando un producto realmente no tenga código
          de lote (sal a granel, algo de verdura). Escanear el lote real es lo que hace que la trazabilidad funcione
          — "NO_LOTE" en todo significa que, si hay una retirada, no puedes demostrar qué serviste.
        </Callout>
      </>
    ),
  },

  "kitchen-pedidos": {
    en: (
      <>
        <p>
          Kitchen Orders lets your staff request stock without ever touching your financials or your suppliers'
          contact details. They pick a supplier, build a list, and submit it — and it lands in your approval queue,
          not in the supplier's inbox. It's the kitchen's request slip, not a spending button.
        </p>
        <KitchenOrdersDemo />
        <StepCard number={1} title="Pick a supplier">
          Staff see the same suppliers you've set up — Peix Fresc del Port, Distribucions Costa, your produce
          supplier — each showing how orders reach them (WhatsApp, email, or both). No prices, no account numbers.
        </StepCard>
        <StepCard number={2} title="Build the list">
          Each supplier's usual products appear with their typical quantity already filled in, so a cook just taps
          to adjust and add. Need something that isn't listed — a one-off, a special? They add a custom item by name
          and quantity.
        </StepCard>
        <StepCard number={3} title="Submit — it becomes a draft for you">
          Submitting doesn't send anything to the supplier. It creates a draft order that appears in your Pedidos
          tab on the main dashboard, waiting for your approval. You keep the final say on every euro spent.
        </StepCard>
        <Callout type="info" title="Why staff never touch the money">
          The whole point of the login-free portal is that anyone on the line can flag "we're low on octopus" the
          moment they notice — without you handing out passwords or exposing costs. The request flows to you; the
          decision stays with you. Fewer 11pm "we forgot to order" surprises, zero financial exposure.
        </Callout>
        <p className="text-sm text-text-dim">
          Related: <em>Pedidos</em> (main dashboard) — where these kitchen requests arrive for your approval.
        </p>
      </>
    ),
    es: (
      <>
        <p>
          Pedidos de Cocina permite a tu equipo solicitar stock sin tocar nunca tus finanzas ni los datos de
          contacto de tus proveedores. Eligen un proveedor, arman una lista y la envían — y llega a tu cola de
          aprobación, no al buzón del proveedor. Es la nota de pedido de la cocina, no un botón de gasto.
        </p>
        <KitchenOrdersDemo />
        <StepCard number={1} title="Elige un proveedor">
          El equipo ve los mismos proveedores que has configurado — Peix Fresc del Port, Distribucions Costa, tu
          proveedor de verdura — cada uno mostrando cómo le llegan los pedidos (WhatsApp, email o ambos). Sin
          precios, sin números de cuenta.
        </StepCard>
        <StepCard number={2} title="Arma la lista">
          Los productos habituales de cada proveedor aparecen con su cantidad típica ya rellenada, así que un
          cocinero solo toca para ajustar y añadir. ¿Falta algo que no está en la lista — algo puntual, un especial?
          Lo añade como artículo personalizado por nombre y cantidad.
        </StepCard>
        <StepCard number={3} title="Envía — se convierte en un borrador para ti">
          Enviar no manda nada al proveedor. Crea un borrador de pedido que aparece en tu pestaña Pedidos del panel
          principal, esperando tu aprobación. Tú mantienes la última palabra sobre cada euro gastado.
        </StepCard>
        <Callout type="info" title="Por qué el equipo nunca toca el dinero">
          El sentido del portal sin login es que cualquiera en la cocina pueda avisar "nos queda poco pulpo" en
          cuanto lo nota — sin que repartas contraseñas ni expongas costes. La solicitud llega a ti; la decisión se
          queda contigo. Menos sorpresas de "se nos olvidó pedir" a las 11 de la noche, cero exposición financiera.
        </Callout>
        <p className="text-sm text-text-dim">
          Relacionado: <em>Pedidos</em> (panel principal) — donde llegan estas solicitudes de cocina para tu
          aprobación.
        </p>
      </>
    ),
  },

  "kitchen-notas": {
    en: (
      <>
        <p>
          Notes is the kitchen's shared memory — two tools in one tab. A running team noticeboard for messages and
          photos, and an agenda calendar for what's coming up. It's where the things that used to live on sticky
          notes and in one person's head become something the whole team can see.
        </p>
        <KitchenNotesDemo />
        <StepCard number={1} title="The noticeboard — a WhatsApp-style team chat">
          It works like the group chat your team already knows: type a message, tap the camera to attach a photo,
          send. A cook snaps the crate of bruised tomatoes that arrived so the manager sees it before deciding
          whether to accept the delivery. A shift leaves a handover: "low on clean aprons, laundry comes Thursday."
          Photos compress automatically, so it's fast even on kitchen wifi, and messages clear themselves after 30
          days so the board stays current.
        </StepCard>
        <StepCard number={2} title="The agenda — a shared calendar">
          A month calendar the whole team can see: a large booking Friday, a deep-clean Monday, a supplier visit, a
          staff birthday. Add a title, date, time, and a color-coded type (delivery, cleaning, health, staff) — it's
          visible to everyone who opens the portal, with today and upcoming events surfaced first.
        </StepCard>
        <StepCard number={3} title="Connect your booking form — reservations land on the calendar">
          This is the piece that makes the calendar run itself. Each restaurant has a private webhook URL; paste it
          into your existing booking form (the one on your website or booking provider), and from then on every new
          reservation drops onto the agenda automatically — table size, name, and time — with no one re-typing
          anything. The kitchen sees the night's bookings the moment they're made.
        </StepCard>
        <Callout type="tip" title="Why this matters more than it looks">
          A restaurant runs on dozens of small pieces of knowledge that usually live in one person's memory. When
          that person is off, things slip. Notes turns that fragile, personal knowledge into shared, durable
          knowledge — the difference between a kitchen that depends on one manager being present and one that keeps
          running smoothly when they're not.
        </Callout>
        <Callout type="note" title="Login-free, like the rest of the portal">
          Notes lives inside the same token-based Kitchen Portal — no password, no access to your financials. It's
          for the team's day-to-day coordination, kept cleanly separate from the owner's dashboard.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          Notas es la memoria compartida de la cocina — dos herramientas en una pestaña. Un tablón de anuncios
          continuo para mensajes y fotos, y una agenda para lo que viene. Es donde las cosas que antes vivían en
          post-its y en la cabeza de una sola persona pasan a estar a la vista de todo el equipo.
        </p>
        <KitchenNotesDemo />
        <StepCard number={1} title="El tablón — un chat de equipo estilo WhatsApp">
          Funciona como el grupo de chat que tu equipo ya conoce: escribes un mensaje, tocas la cámara para adjuntar
          una foto, envías. Un cocinero fotografía la caja de tomates golpeados que llegó para que el encargado lo
          vea antes de decidir si acepta la entrega. Un turno deja un relevo: "quedan pocos delantales limpios, la
          lavandería viene el jueves". Las fotos se comprimen solas, así que es rápido incluso con el wifi de la
          cocina, y los mensajes se borran solos a los 30 días para que el tablón esté siempre al día.
        </StepCard>
        <StepCard number={2} title="La agenda — un calendario compartido">
          Un calendario mensual que todo el equipo ve: una reserva grande el viernes, una limpieza a fondo el lunes,
          la visita de un proveedor, el cumpleaños de alguien. Añade título, fecha, hora y un tipo con color
          (entrega, limpieza, sanidad, personal) — queda visible para todos los que abran el portal, con hoy y los
          próximos eventos destacados primero.
        </StepCard>
        <StepCard number={3} title="Conecta tu formulario de reservas — las reservas llegan al calendario">
          Esta es la pieza que hace que el calendario se llene solo. Cada restaurante tiene una URL de webhook
          privada; la pegas en tu formulario de reservas existente (el de tu web o tu proveedor de reservas), y a
          partir de ahí cada reserva nueva aparece en la agenda automáticamente — número de comensales, nombre y hora
          — sin que nadie reescriba nada. La cocina ve las reservas de la noche en cuanto se hacen.
        </StepCard>
        <Callout type="tip" title="Por qué importa más de lo que parece">
          Un restaurante funciona con decenas de pequeños datos que normalmente viven en la memoria de una sola
          persona. Cuando esa persona libra, las cosas se escapan. Notas convierte ese conocimiento frágil y personal
          en conocimiento compartido y duradero — la diferencia entre una cocina que depende de que un encargado esté
          presente y una que sigue funcionando bien cuando no está.
        </Callout>
        <Callout type="note" title="Sin login, como el resto del portal">
          Notas vive dentro del mismo Portal de Cocina basado en token — sin contraseña, sin acceso a tus finanzas.
          Es para la coordinación diaria del equipo, mantenida limpiamente separada del panel del dueño.
        </Callout>
      </>
    ),
  },
};
