# DESIGN.md — Дизайн-система лендинга

## Общий стиль

**Необрутализм (Neobrutalism)** — современный вариант брутализма с яркими блочными цветами, жирными чёрными рамками, смещёнными тенями и grotesk-типографикой в верхнем регистре.

Ключевые принципы:
- Жёсткие чёрные границы `border-2 border-black` или `border-4 border-black`
- Смещённые тени `shadow-[4px_4px_0_0_#000]` (box-shadow без blur)
- Все кнопки, карточки и блоки — прямоугольные (`rounded-none`)
- Текст заголовков — **UPPERCASE**, `font-black` (font-weight: 900)
- Hover-эффект на кнопках: смещение на 2px вниз-вправо с обнулением тени

---

## Цветовая палитра

| Название        | Hex       | Tailwind класс        | Использование                                     |
|----------------|-----------|----------------------|--------------------------------------------------|
| Cream           | `#fff8d6` | `bg-[#fff8d6]`       | Основной фон (секции Solution, Story, FAQ)       |
| Pink (Hero)     | `#ff5c8a` | `bg-[#ff5c8a]`       | Hero-секция, акцентные элементы, шаг-нумераторы  |
| Yellow          | `#ffe600` | `bg-[#ffe600]`       | Problem-секция, CTA-кнопки, выделения текста     |
| Cyan            | `#00f0ff` | `bg-[#00f0ff]`       | Product-секция, Pricing-секция, акценты          |
| Black           | `#000000` | `text-black`         | Весь текст, все рамки, тени                      |
| Dark (Footer)   | `#111111` | `bg-[#111111]`       | Финальная CTA-секция (тёмный фон)                |
| White           | `#ffffff` | `bg-white`           | Карточки, кнопки, фоны блоков                    |

**Чередование секций по цвету фона:**
```
Hero       → #ff5c8a (pink)
Problem    → #ffe600 (yellow)
Solution   → #fff8d6 (cream)
Product    → #00f0ff (cyan)
Story      → #fff8d6 (cream)
Benefits   → #ffe600 (yellow)
Pricing    → #00f0ff (cyan)
FAQ        → #fff8d6 (cream)
Final CTA  → #111111 (dark)
Footer     → #ffffff (white)
```

---

## Типографика

- **Шрифт**: системный sans-serif (или Geist/Inter — любой grotesk)
- **Заголовки**: `font-black uppercase tracking-tight` — максимальный вес, заглавные буквы
- **Подзаголовки/body**: `font-semibold` или `font-medium`
- **Мелкий текст**: `text-sm font-medium text-black/80`

### Размеры заголовков

```
H1 (Hero): text-4xl → sm:text-5xl → md:text-6xl → lg:text-7xl
H2 (sections): text-3xl → sm:text-4xl
H3 (cards): text-xl uppercase font-black
```

### Выделение текста в заголовках

Часть слов выделяется фоновым прямоугольником:
```jsx
<span className="bg-[#00f0ff] px-2 text-black">выделенный текст</span>
// или
<span className="bg-[#ffe600] px-1 font-black text-black">слово</span>
```

---

## Секции

Каждая секция имеет:
- `border-b-4 border-black` — нижняя разделительная линия
- `py-20 sm:py-28` — вертикальные отступы
- `mx-auto max-w-[4xl|5xl|6xl] px-6` — контейнер с ограниченной шириной

### Заголовок секции (стандартный блок)

```jsx
<div className="text-center">
  <Badge className="mb-4 rounded-none border-2 border-black bg-[ACCENT_COLOR] font-black text-black uppercase">
    Метка секции
  </Badge>
  <h2 className="font-black text-3xl uppercase tracking-tight sm:text-4xl">
    Заголовок секции
  </h2>
  <p className="mx-auto mt-4 max-w-2xl font-medium text-black/80">
    Подзаголовок
  </p>
</div>
```

Цвет Badge зависит от фона секции (контраст):
- Cream фон → `bg-[#ffe600]` или `bg-[#ff5c8a]`
- Yellow фон → `bg-white`
- Cyan фон → `bg-white`
- Pink фон → (не применяется как фон секций кроме Hero)

---

## Компоненты

### Badge (метки секций)

```jsx
<Badge
  className="rounded-none border-2 border-black bg-[COLOR] font-black text-black uppercase px-4 py-1.5"
  variant="outline" // или "secondary"
>
  Текст метки
</Badge>
```

### Кнопки

**Первичная (yellow CTA):**
```jsx
<Button
  className="h-12 rounded-none border-2 border-black bg-[#ffe600] px-8 font-black text-base text-black uppercase shadow-[4px_4px_0_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
  size="lg"
>
  Текст кнопки
  <ArrowRight className="ml-2 size-4" />
</Button>
```

**Вторичная (cyan):**
```jsx
<Button
  className="h-12 rounded-none border-2 border-black bg-[#00f0ff] px-8 font-black text-base text-black uppercase shadow-[4px_4px_0_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
  size="lg"
  variant="outline"
>
  Текст кнопки
</Button>
```

**На тёмном фоне (outline white):**
```jsx
<Button
  className="h-12 rounded-none border-2 border-white bg-transparent px-8 font-black text-base text-white uppercase shadow-[4px_4px_0_0_#00f0ff] hover:bg-white hover:text-black"
  size="lg"
  variant="outline"
>
  Текст кнопки
</Button>
```

**Hover-эффект**: кнопка смещается на `translate-x-[2px] translate-y-[2px]` и тень обнуляется (`shadow-none`).

### Карточки

**Стандартная карточка:**
```jsx
<div className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_0_#000] transition-all hover:-translate-y-1">
  {/* контент */}
</div>
```

**Карточка с иконкой (слои фреймворка):**
```jsx
<div className="group relative border-2 border-black bg-white p-6 shadow-[5px_5px_0_0_#000] transition-all hover:-translate-y-1">
  <div className={`mb-4 inline-flex size-12 items-center justify-center border-2 border-black bg-gradient-to-br ${color} text-white`}>
    <Icon className="size-6" />
  </div>
  <h3 className="mb-2 font-black text-xl uppercase">{title}</h3>
  <p className="font-medium text-black/80 text-sm">{desc}</p>
</div>
```

**Иконка карточки продукта (yellow background):**
```jsx
<div className="mb-4 inline-flex size-11 items-center justify-center border-2 border-black bg-[#ffe600] text-black">
  <Icon className="size-5" />
</div>
```

**Выделенный блок (акцентный баннер):**
```jsx
<div className="border-4 border-black bg-[#00f0ff] p-6 text-center shadow-[6px_6px_0_0_#000]">
  <p className="font-black text-lg">Текст</p>
</div>
```

### Градиенты иконок (6 слоёв)

```
from-amber-500 to-orange-500   (Positioning)
from-orange-500 to-red-500     (Rhythm)
from-red-500 to-pink-500       (Workflow)
from-pink-500 to-purple-500    (Toolset)
from-purple-500 to-indigo-500  (Feedback loops)
from-indigo-500 to-blue-500    (Identity)
```

### Элемент «Проблема» (крестик)

```jsx
<div className="flex items-start gap-4 border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#000]">
  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center border-2 border-black bg-[#ff5c8a] font-black text-black text-xs">
    ✕
  </div>
  <p className="font-medium text-black">{text}</p>
</div>
```

### Элемент «Результаты» (галочка)

```jsx
<div className="flex items-start gap-4 border-2 border-black bg-white p-6 shadow-[5px_5px_0_0_#000]">
  <div className="mt-1 flex size-8 shrink-0 items-center justify-center border-2 border-black bg-[#00f0ff]">
    <Check className="size-4 text-black" />
  </div>
  <div>
    <h3 className="mb-1 font-black uppercase">{title}</h3>
    <p className="font-medium text-black/80 text-sm">{desc}</p>
  </div>
</div>
```

### Статистика / теги в Hero

```jsx
<span className="flex items-center gap-2 border-2 border-black bg-white px-3 py-2 font-bold uppercase shadow-[3px_3px_0_0_#000]">
  <Icon className="size-4 text-black" />
  Текст
</span>
```

### Вертикальный timeline (шаги)

```jsx
<div className="flex items-start gap-5">
  <div className="relative flex w-14 shrink-0 justify-center">
    {/* Номер шага */}
    <div className="flex size-14 items-center justify-center border-2 border-black bg-[#ff5c8a] font-black font-mono text-black text-lg">
      {num}
    </div>
    {/* Вертикальная линия между шагами */}
    {!isLast && (
      <div className="absolute top-14 left-1/2 hidden h-[calc(100%+2rem)] w-1 -translate-x-1/2 bg-black sm:block" />
    )}
  </div>
  {/* Контент шага */}
  <div className="flex-1 rounded-none border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]">
    <p className="font-medium text-base leading-relaxed">{text}</p>
  </div>
</div>
```

### Pricing карточки

**Обычная карточка:**
```jsx
<div className="relative flex h-full flex-col border-2 border-black bg-white p-6 shadow-[5px_5px_0_0_#000] transition-all hover:-translate-y-1">
```

**Highlighted карточка (популярный тариф):**
```jsx
<div className="relative flex h-full flex-col border-2 border-black bg-[#ffe600] p-6 shadow-[5px_5px_0_0_#000] -translate-y-1">
  {/* Бейдж "Популярный" */}
  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
    <Badge className="rounded-none border-2 border-black bg-[#ff5c8a] px-3 py-1 font-black text-black text-xs uppercase">
      Популярный
    </Badge>
  </div>
```

**Цена:**
```jsx
<p className="mt-1 bg-[#00f0ff] px-2 py-1 font-black text-3xl text-black">
  <span className="text-2xl text-black/50 line-through decoration-2">{oldPrice}</span>{" "}
  {price}
</p>
```

**Метка скидки:**
```jsx
<p className="mt-2 inline-flex w-fit border-2 border-black bg-[#ff5c8a] px-2 py-1 font-black text-black text-xs uppercase">
  {discountLabel}
</p>
```

**Кнопка highlighted тарифа:**
```jsx
<Button className="mt-8 h-11 w-full rounded-none border-2 border-black bg-[#ff5c8a] font-black text-base text-black uppercase shadow-[4px_4px_0_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
```

### FAQ Accordion

```jsx
<div className="mb-4 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]">
  <button
    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-black text-lg uppercase transition-colors hover:bg-[#00f0ff]/20"
    onClick={() => setOpen(!open)}
    type="button"
  >
    {question}
    {open ? <ChevronUp className="size-5 shrink-0" /> : <ChevronDown className="size-5 shrink-0" />}
  </button>
  {open && (
    <motion.div
      animate={{ opacity: 1, height: "auto" }}
      className="overflow-hidden px-5 pb-5 font-medium text-black/80"
      initial={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
    >
      {answer}
    </motion.div>
  )}
</div>
```

### Декоративные элементы Hero

Абсолютно позиционированные геометрические фигуры:
```jsx
{/* Диагональный паттерн фона */}
<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_45%,rgba(0,0,0,0.07)_45%,rgba(0,0,0,0.07)_55%,transparent_55%,transparent_100%)]" />

{/* Жёлтый квадрат (верхний правый) */}
<div className="pointer-events-none absolute top-12 right-8 size-20 border-4 border-black bg-[#ffe600]" />

{/* Голубой квадрат (нижний левый) */}
<div className="pointer-events-none absolute bottom-10 left-8 size-14 border-4 border-black bg-[#00f0ff]" />
```

Финальная CTA секция (тёмный фон) — диагональный паттерн:
```jsx
<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,transparent_40%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0.08)_50%,transparent_50%,transparent_100%)]" />
```

---

## Анимации

Используется библиотека `motion/react` (Motion for React).

### FadeIn компонент (основной)

```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.5, delay, ease: "easeOut" }}
>
  {children}
</motion.div>
```

- `once: true` — анимируется только при первом появлении
- `margin: "-60px"` — срабатывает чуть раньше попадания в viewport
- Каскадные задержки для элементов списка: `delay={i * 0.08}` или `delay={i * 0.1}`

### FAQ раскрытие

```jsx
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: "auto" }}
  transition={{ duration: 0.25 }}
>
```

---

## Сетки

```
Карточки 6 слоёв:  grid gap-6 sm:grid-cols-2 lg:grid-cols-3
Карточки продукта: grid gap-6 sm:grid-cols-2
Блоки результатов: grid gap-6 sm:grid-cols-2
Pricing:           grid gap-6 md:grid-cols-3
Testimonials:      grid gap-8 md:grid-cols-2
```

---

## Описание секций

### 1. Hero
- Фон: `#ff5c8a`, нижняя граница `border-b-4 border-black`
- Badge с иконкой `Sparkles`
- H1 с частью текста на cyan-фоне
- Subtitle в белом блоке с тенью `shadow-[4px_4px_0_0_#000]`
- Две CTA-кнопки (yellow + cyan)
- Три badge-тега с иконками (clock, layers, github)
- Декоративные квадраты и диагональный overlay

### 2. Problem
- Фон: `#ffe600`
- Список «болей» с pink иконкой ✕
- Завершающий cyan-блок с акцентным тезисом

### 3. Solution (6 Layers)
- Фон: `#fff8d6`
- Сетка 3 колонки с карточками
- Иконки с цветными градиентными фонами
- Текст-резюме с желтым inline-выделением

### 4. Product
- Фон: `#00f0ff`
- Сетка 2 колонки с карточками (yellow иконки)
- Pink баннер-бонус
- Две CTA-кнопки (yellow + white)

### 5. Story (How it works)
- Фон: `#fff8d6`
- Вертикальный timeline с numbered шагами
- Вертикальная линия-соединитель между шагами (desktop only)
- Cyan итоговый баннер с иконкой Clock

### 6. Benefits
- Фон: `#ffe600`
- Сетка 2 колонки с check-карточками (cyan иконки)

### 7. Pricing
- Фон: `#00f0ff`
- Сетка 3 колонки
- Центральная карточка highlighted (yellow фон, поднята `-translate-y-1`)
- Badge «Популярный» над highlighted карточкой
- Цена с зачёркнутой старой и cyan-фоном

### 8. FAQ
- Фон: `#fff8d6`
- Аккордеон с анимацией раскрытия
- Hover на вопросе: `hover:bg-[#00f0ff]/20`

### 9. Final CTA
- Фон: `#111111` (тёмный)
- Иконка Rocket жёлтого цвета
- Yellow primary кнопка + white outline кнопка с cyan-тенью

### 10. Footer
- Фон: `#ffffff`, граница `border-t-4 border-black`
- Центрированный копирайт

---

## Зависимости

```json
{
  "motion": "^12.x",
  "lucide-react": "latest",
  "@radix-ui/react-badge": "через shadcn/ui",
  "@radix-ui/react-button": "через shadcn/ui",
  "tailwindcss": "^4.x"
}
```

Иконки из `lucide-react`:
`ArrowRight, BookOpen, Check, CheckSquare, ChevronDown, ChevronUp, Clock, GitBranch, Github, Layers, MessageCircle, Quote, Rocket, Sparkles, Star, Target, User, Wrench, Zap`

---

## Tailwind-утилиты (нестандартные)

```css
/* Смещённые тени (без blur) */
shadow-[4px_4px_0_0_#000]
shadow-[5px_5px_0_0_#000]
shadow-[6px_6px_0_0_#000]
shadow-[3px_3px_0_0_#000]
shadow-[4px_4px_0_0_#fff]   /* для тёмного фона */
shadow-[4px_4px_0_0_#00f0ff] /* cyan-тень */

/* Произвольные цвета фона */
bg-[#fff8d6]
bg-[#ff5c8a]
bg-[#ffe600]
bg-[#00f0ff]
bg-[#111111]

/* Диагональные градиентные оверлеи */
bg-[linear-gradient(135deg,...)]
bg-[linear-gradient(45deg,...)]

/* Hover со сдвигом */
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
```
