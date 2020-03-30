function link(parent, args, context) {
  return context.prisma.vote({ id: parent.id }).link();
}
