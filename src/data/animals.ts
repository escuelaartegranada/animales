export type Movement = 'camina' | 'vuela' | 'nada' | 'repta' | 'salta';
export type BodyPart = 'pico' | 'pelo' | 'patas' | 'plumas' | 'cola' | 'alas' | 'aletas' | 'escamas' | 'piel desnuda';
export type Birth = 'ovíparo' | 'vivíparo';
export type Diet = 'carnívoro' | 'herbívoro' | 'omnívoro';
export type Relation = 'doméstico' | 'salvaje';

export interface Animal {
  id: string;
  nombre: string;
  nombreIngles: string;
  emoji: string;
  caracteristicas: BodyPart[];
  desplazamiento: Movement[];
  nacimiento: Birth;
  alimentacion: Diet;
  relacion: Relation;
  explicacionInfantil: string;
}

export const animals: Animal[] = [
  {
    id: 'perro',
    nombre: 'Perro',
    nombreIngles: 'Dog',
    emoji: '🐶',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'omnívoro',
    relacion: 'doméstico',
    explicacionInfantil: 'El perro es nuestro mejor amigo. Le encanta jugar con la pelota y que le acaricien el pelo.',
  },
  {
    id: 'gato',
    nombre: 'Gato',
    nombreIngles: 'Cat',
    emoji: '🐱',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'carnívoro',
    relacion: 'doméstico',
    explicacionInfantil: 'El gato es muy ágil. Le gusta dormir al sol y atrapar ratones.',
  },
  {
    id: 'pajaro',
    nombre: 'Pájaro',
    nombreIngles: 'Bird',
    emoji: '🐦',
    caracteristicas: ['pico', 'patas', 'plumas', 'alas', 'cola'],
    desplazamiento: ['vuela'],
    nacimiento: 'ovíparo',
    alimentacion: 'omnívoro',
    relacion: 'salvaje',
    explicacionInfantil: 'El pájaro canta por las mañanas y puede volar muy alto en el cielo.',
  },
  {
    id: 'pez',
    nombre: 'Pez',
    nombreIngles: 'Fish',
    emoji: '🐟',
    caracteristicas: ['aletas', 'escamas', 'cola'],
    desplazamiento: ['nada'],
    nacimiento: 'ovíparo',
    alimentacion: 'omnívoro', // Many fish are omnivores
    relacion: 'salvaje',
    explicacionInfantil: 'El pez vive bajo el agua y respira por branquias. Nada moviendo sus aletas.',
  },
  {
    id: 'vaca',
    nombre: 'Vaca',
    nombreIngles: 'Cow',
    emoji: '🐮',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'herbívoro',
    relacion: 'doméstico',
    explicacionInfantil: 'La vaca vive en la granja y come mucha hierba. Nos da una leche riquísima.',
  },
  {
    id: 'conejo',
    nombre: 'Conejo',
    nombreIngles: 'Rabbit',
    emoji: '🐰',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['salta'],
    nacimiento: 'vivíparo',
    alimentacion: 'herbívoro',
    relacion: 'doméstico',
    explicacionInfantil: 'El conejo tiene unas orejas muy largas y salta para moverse.',
  },
  {
    id: 'gallina',
    nombre: 'Gallina',
    nombreIngles: 'Hen',
    emoji: '🐔',
    caracteristicas: ['pico', 'patas', 'plumas', 'alas', 'cola'],
    desplazamiento: ['camina'], // They mainly walk rather than fly
    nacimiento: 'ovíparo',
    alimentacion: 'omnívoro',
    relacion: 'doméstico',
    explicacionInfantil: 'La gallina pone los huevos que luego comemos en tortilla.',
  },
  {
    id: 'serpiente',
    nombre: 'Serpiente',
    nombreIngles: 'Snake',
    emoji: '🐍',
    caracteristicas: ['escamas', 'cola'],
    desplazamiento: ['repta'],
    nacimiento: 'ovíparo',
    alimentacion: 'carnívoro',
    relacion: 'salvaje',
    explicacionInfantil: 'La serpiente no tiene patas. Se arrastra por el suelo moviendo su cuerpo.',
  },
  {
    id: 'rana',
    nombre: 'Rana',
    nombreIngles: 'Frog',
    emoji: '🐸',
    caracteristicas: ['patas', 'piel desnuda'],
    desplazamiento: ['salta'],
    nacimiento: 'ovíparo',
    alimentacion: 'carnívoro', // Frogs eat insects
    relacion: 'salvaje',
    explicacionInfantil: 'La rana tiene la piel muy húmeda. Atrapa moscas con su lengua pegajosa.',
  },
  {
    id: 'leon',
    nombre: 'León',
    nombreIngles: 'Lion',
    emoji: '🦁',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'carnívoro',
    relacion: 'salvaje',
    explicacionInfantil: 'El león es el rey de la selva. Tiene una gran melena.',
  },
  {
    id: 'tortuga',
    nombre: 'Tortuga',
    nombreIngles: 'Turtle',
    emoji: '🐢',
    caracteristicas: ['patas', 'cola', 'escamas'], // Has shell, but scales on limbs
    desplazamiento: ['camina'], // Let's use walk for simplicity, can also swim
    nacimiento: 'ovíparo',
    alimentacion: 'herbívoro', // Depends, but many common land ones are herbivores
    relacion: 'salvaje',
    explicacionInfantil: 'La tortuga lleva su casa a cuestas y camina despacito.',
  },
  {
    id: 'caballo',
    nombre: 'Caballo',
    nombreIngles: 'Horse',
    emoji: '🐴',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'herbívoro',
    relacion: 'doméstico',
    explicacionInfantil: 'El caballo puede correr muy deprisa. Tiene un pelo muy bonito llamado crin.',
  },
  {
    id: 'cerdo',
    nombre: 'Cerdo',
    nombreIngles: 'Pig',
    emoji: '🐷',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'omnívoro',
    relacion: 'doméstico',
    explicacionInfantil: 'El cerdito tiene un hocico redondo y una cola rizada como un muelle.',
  },
  {
    id: 'tigre',
    nombre: 'Tigre',
    nombreIngles: 'Tiger',
    emoji: '🐯',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'carnívoro',
    relacion: 'salvaje',
    explicacionInfantil: 'El tigre tiene rayas naranjas y negras en su pelo. Es un cazador salvaje.',
  },
  {
    id: 'jirafa',
    nombre: 'Jirafa',
    nombreIngles: 'Giraffe',
    emoji: '🦒',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'herbívoro',
    relacion: 'salvaje',
    explicacionInfantil: 'La jirafa tiene el cuello más largo de todos los animales para llegar a las hojas altas.',
  },
  {
    id: 'delfin',
    nombre: 'Delfín',
    nombreIngles: 'Dolphin',
    emoji: '🐬',
    caracteristicas: ['aletas', 'cola', 'piel desnuda'], // No hair/scales generally
    desplazamiento: ['nada'],
    nacimiento: 'vivíparo',
    alimentacion: 'carnívoro', // Eats fish/squid
    relacion: 'salvaje',
    explicacionInfantil: 'El delfín es muy inteligente. Da saltos en el mar y se comunica con ruiditos.',
  },
  {
    id: 'pinguino',
    nombre: 'Pingüino',
    nombreIngles: 'Penguin',
    emoji: '🐧',
    caracteristicas: ['pico', 'patas', 'plumas', 'alas'], // Cannot fly but has them
    desplazamiento: ['nada'], // Also walks/waddles
    nacimiento: 'ovíparo',
    alimentacion: 'carnívoro',
    relacion: 'salvaje',
    explicacionInfantil: 'El pingüino vive en el hielo. Tiene alas pero no las usa para volar, ¡sino para bucear!',
  },
  {
    id: 'cocodrilo',
    nombre: 'Cocodrilo',
    nombreIngles: 'Crocodile',
    emoji: '🐊',
    caracteristicas: ['patas', 'cola', 'escamas'],
    desplazamiento: ['nada', 'repta', 'camina'],
    nacimiento: 'ovíparo',
    alimentacion: 'carnívoro',
    relacion: 'salvaje',
    explicacionInfantil: 'El cocodrilo tiene dientes muy grandes y toma el sol junto al río.',
  },
  {
    id: 'oso',
    nombre: 'Oso',
    nombreIngles: 'Bear',
    emoji: '🐻',
    caracteristicas: ['patas', 'cola', 'pelo'],
    desplazamiento: ['camina'],
    nacimiento: 'vivíparo',
    alimentacion: 'omnívoro', // Bears are omnivores
    relacion: 'salvaje',
    explicacionInfantil: 'El oso come de todo: peces, bayas y le encanta la miel.',
  },
  {
    id: 'mariposa',
    nombre: 'Mariposa',
    nombreIngles: 'Butterfly',
    emoji: '🦋',
    caracteristicas: ['alas', 'patas'],
    desplazamiento: ['vuela'],
    nacimiento: 'ovíparo',
    alimentacion: 'herbívoro', // Nectar
    relacion: 'salvaje',
    explicacionInfantil: 'La mariposa revolotea de flor en flor. Antes era una oruga.',
  }
];
