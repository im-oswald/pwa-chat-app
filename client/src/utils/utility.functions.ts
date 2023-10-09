export class Utils {
  public static camelCaseToNormal(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }
}