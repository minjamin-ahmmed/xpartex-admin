import ProductCard from "@/components/products/ProductCard";
import ProductTable from "@/components/products/ProductTable";

const productPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <ProductCard />
      <ProductTable />
    </div>
  );
};

export default productPage;
