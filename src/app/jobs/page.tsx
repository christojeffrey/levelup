import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Jobs() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Virtual Assistant</CardTitle>
          <CardDescription>Rp50.000-80.000/hr</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Start Learning!</Button>
        </CardFooter>
      </Card>
    </>
  );
}
