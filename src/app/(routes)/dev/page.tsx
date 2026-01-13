import {
  Card,
  Header,
  List,
  ListItem,
  SectionBlock,
  TextBlock,
} from "@/shared/ui/blocks";

export default function CssExample() {
  return (
    <>
      <Header color="orange-2" density="md" typography="title">
        <TextBlock title="Search" body="Find engineering content" />
      </Header>
      <Card color="blue-2" density="md" typography="body">
        This is a card
      </Card>
      <List>
        <ListItem color="yellow-1" density="tight" typography="meta">
          List item 1
        </ListItem>
        <ListItem color="green-1" density="tight" typography="meta">
          List item 2
        </ListItem>
      </List>
      <SectionBlock>Section</SectionBlock>
    </>
  );
}
